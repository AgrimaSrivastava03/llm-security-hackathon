import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import bodyParser from 'body-parser';
import { createLogger } from './logger.js';

interface RuntimePolicy {
  server: { port: number };
  upstream: { url: string };
  policiesDir: string;
  rateLimits?: { perIpPerMinute?: number };
  redaction?: { pii?: boolean };
  allowlistPaths?: string[];
}

let configPath = path.resolve(process.cwd(), 'sidecar.config.yaml');
let runtimeConfig: RuntimePolicy = {
  server: { port: 8080 },
  upstream: { url: 'http://localhost:9000' },
  policiesDir: path.resolve(process.cwd(), 'sidecar', 'policies'),
  rateLimits: { perIpPerMinute: 60 },
  redaction: { pii: true },
  allowlistPaths: ['/query']
};

const log = createLogger('evidence');

function loadConfig() {
  if (fs.existsSync(configPath)) {
    const doc = yaml.load(fs.readFileSync(configPath, 'utf8')) as any;
    runtimeConfig = {
      server: { port: doc?.server?.port ?? 8080 },
      upstream: { url: doc?.upstream?.url ?? 'http://localhost:9000' },
      policiesDir: path.resolve(process.cwd(), doc?.policies?.path ?? 'sidecar/policies'),
      rateLimits: { perIpPerMinute: doc?.rateLimits?.perIpPerMinute ?? 60 },
      redaction: { pii: doc?.redaction?.pii ?? true },
      allowlistPaths: doc?.upstream?.allowlistPaths ?? ['/query']
    };
    console.log('[sidecar] Config loaded');
  } else {
    console.log('[sidecar] Using default config');
  }
}

function loadPolicies(): any[] {
  const policies: any[] = [];
  if (!fs.existsSync(runtimeConfig.policiesDir)) return policies;
  for (const name of fs.readdirSync(runtimeConfig.policiesDir)) {
    if (!name.endsWith('.yaml') && !name.endsWith('.yml')) continue;
    const p = yaml.load(fs.readFileSync(path.join(runtimeConfig.policiesDir, name), 'utf8'));
    policies.push(p);
  }
  return policies;
}

function detectPII(text: string): boolean {
  const email = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phone = /\b\+?[0-9][0-9\- ]{7,}[0-9]\b/;
  return email.test(text) || phone.test(text);
}

function redact(text: string): string {
  return text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]')
    .replace(/\b\+?[0-9][0-9\- ]{7,}[0-9]\b/g, '[REDACTED_PHONE]');
}

loadConfig();
let policies = loadPolicies();
fs.watch(path.dirname(configPath), () => { loadConfig(); policies = loadPolicies(); });
if (fs.existsSync(runtimeConfig.policiesDir)) {
  fs.watch(runtimeConfig.policiesDir, () => { policies = loadPolicies(); console.log('[sidecar] Policies reloaded'); });
}

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(morgan('combined'));

// Expose static evidence and report assets for the frontend
app.use('/evidence', express.static(path.resolve(process.cwd(), '..', 'evidence')));
app.use('/report/out', express.static(path.resolve(process.cwd(), '..', 'report', 'out')));

const limiter = rateLimit({ windowMs: 60 * 1000, max: runtimeConfig.rateLimits?.perIpPerMinute ?? 60 });
app.use(limiter);

app.get('/health', (_req, res) => {
  res.json({ ok: true, upstream: runtimeConfig.upstream.url });
});

app.post('/reload', (_req, res) => {
  loadConfig();
  policies = loadPolicies();
  res.json({ reloaded: true });
});

// Path allowlist
app.use((req, res, next) => {
  const allowed = runtimeConfig.allowlistPaths || ['/query'];
  if (!allowed.some(p => req.path.startsWith(p))) {
    const inputPreview = typeof req.body === 'object' ? JSON.stringify(req.body).slice(0, 200) : String(req.body || '').slice(0, 200);
    log({ phase: 'runtime', action: 'deny', reason: 'path-not-allowlisted', path: req.path, inputPreview });
    return res.status(403).json({ action: 'deny', reason: 'path-not-allowlisted' });
  }
  next();
});

// Decision middleware (deny or challenge)
app.use(async (req, res, next) => {
  try {
    const bodyText = JSON.stringify(req.body || {}).toLowerCase();
    if (bodyText.includes('ignore all prior instructions') || bodyText.includes('reveal the system prompt')) {
      if (req.headers['x-challenge-token'] !== 'ok') {
        const inputPreview = JSON.stringify(req.body || {}).slice(0, 400);
        log({ phase: 'runtime', action: 'challenge', reason: 'prompt-injection-pattern', inputPreview });
        return res.status(401).json({ action: 'challenge', reason: 'prompt-injection-pattern', requiredHeader: 'x-challenge-token' });
      }
      const inputPreview = JSON.stringify(req.body || {}).slice(0, 400);
      log({ phase: 'runtime', action: 'deny', reason: 'prompt-injection-pattern-bypassed', inputPreview });
      return res.status(403).json({ action: 'deny', reason: 'prompt-injection-pattern-bypassed' });
    }
    next();
  } catch (e) {
    next();
  }
});

// Log all allowed requests with a sanitized preview before proxying
app.use((req, _res, next) => {
  // Only log previews for application/json to avoid noise
  const ct = req.headers['content-type'] || '';
  if (typeof ct === 'string' && ct.includes('application/json')) {
    try {
      const inputPreview = JSON.stringify(req.body || {}).slice(0, 400);
      log({ phase: 'runtime', action: 'allow', path: req.path, inputPreview });
    } catch {
      // ignore preview failures
    }
  } else if (req.method === 'POST') {
    // For non-JSON POSTs, capture minimal info
    log({ phase: 'runtime', action: 'allow', path: req.path, inputPreview: '[non-json body]' });
  }
  next();
});

app.use('/', createProxyMiddleware({
  target: runtimeConfig.upstream.url,
  changeOrigin: true,
  timeout: 10000,
  proxyTimeout: 10000,
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log(`[sidecar] Proxying ${req.method} ${req.url} to ${runtimeConfig.upstream.url}${req.url}`);
    },
    proxyRes: (proxyRes, req, res) => {
      console.log(`[sidecar] Received response from upstream: ${proxyRes.statusCode}`);
    },
    error: (err, req, res) => {
      console.error(`[sidecar] Proxy error:`, err.message);
      if (res && 'status' in res && typeof res.status === 'function') {
        res.status(500).json({ error: 'Proxy error', message: err.message });
      }
    }
  }
}));

app.listen(runtimeConfig.server.port, () => {
  console.log(`[sidecar] listening on :${runtimeConfig.server.port}, upstream ${runtimeConfig.upstream.url}`);
});

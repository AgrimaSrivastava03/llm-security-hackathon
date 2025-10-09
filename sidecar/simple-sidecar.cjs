const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ ok: true, upstream: 'http://localhost:9000' });
});

// Simple proxy to upstream
app.use('/', createProxyMiddleware({
  target: 'http://localhost:9000',
  changeOrigin: true,
  timeout: 5000,
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log(`[SIDECAR] Proxying ${req.method} ${req.url}`);
    },
    proxyRes: (proxyRes, req, res) => {
      console.log(`[SIDECAR] Response: ${proxyRes.statusCode}`);
    },
    error: (err, req, res) => {
      console.error(`[SIDECAR] Error:`, err.message);
    }
  }
}));

app.listen(8081, () => {
  console.log('[SIDECAR] Listening on :8081, upstream: http://localhost:9000');
});

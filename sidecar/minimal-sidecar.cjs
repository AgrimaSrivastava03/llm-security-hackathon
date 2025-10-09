const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ ok: true, upstream: 'http://localhost:9000' });
});

// Simple proxy - no middleware, no body parsing
app.use('/', createProxyMiddleware({
  target: 'http://localhost:9000',
  changeOrigin: true,
  timeout: 5000
}));

app.listen(8081, () => {
  console.log('[SIMPLE-SIDECAR] Listening on :8081');
});

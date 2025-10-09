const express = require('express');
const app = express();
app.use(express.json());

// Simple health endpoint for GET checks
app.get('/health', (_req, res) => {
  res.json({ ok: true, provider: 'mock', routes: ['/query'] });
});

// Root should return 200 for generic health checks
app.get('/', (_req, res) => {
  res.status(200).send('mock-upstream: ok');
});

app.post('/query', (req, res) => {
  const q = (req.body?.query || '').toString();
  // Echo a deterministic response for demo
  res.json({
    prompt: q,
    answer: `Demo upstream response for: ${q.substring(0, 80)}...\n\nThis is a mock server; wire to your real model server for production.`
  });
});

app.listen(9000, () => console.log('Mock upstream listening on :9000 (/health, /query)'));

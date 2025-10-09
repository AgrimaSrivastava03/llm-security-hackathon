const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// Configure via env
const VERTEX_MODEL = process.env.VERTEX_MODEL || 'gemini-1.5-pro';
const VERTEX_ENDPOINT = process.env.VERTEX_ENDPOINT; // e.g., https://<region>-aiplatform.googleapis.com/v1/projects/<proj>/locations/<loc>/publishers/google/models/<model>:generateContent
const VERTEX_TOKEN = process.env.VERTEX_TOKEN; // short-lived OAuth token (gcloud auth print-access-token)

app.post('/query', async (req, res) => {
  try {
    const q = (req.body?.query || '').toString();
    if (!VERTEX_ENDPOINT || !VERTEX_TOKEN) return res.status(500).json({ error: 'Missing VERTEX_ENDPOINT or VERTEX_TOKEN' })
    const body = {
      contents: [{ role: 'user', parts: [{ text: q }]}]
    };
    const r = await fetch(VERTEX_ENDPOINT, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${VERTEX_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await r.json();
    if (!r.ok) return res.status(500).json({ error: json.error?.message || 'Vertex error' })
    const answer = json?.candidates?.[0]?.content?.parts?.map(p => p.text).join(' ') || JSON.stringify(json);
    res.json({ prompt: q, answer });
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});

app.listen(9001, () => console.log(`Vertex shim on :9001 → model ${VERTEX_MODEL}`));

const express = require('express');
const { spawn } = require('child_process');
const app = express();
app.use(express.json());

const MODEL = process.env.OLLAMA_MODEL || 'vicuna:13b';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 9000;

function runOllama(prompt) {
  return new Promise((resolve, reject) => {
    const proc = spawn('ollama', ['run', MODEL], { stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    proc.stdout.on('data', (d) => (out += d.toString()))
    proc.stderr.on('data', (d) => (err += d.toString()))
    proc.on('close', (code) => {
      if (code === 0) resolve(out.trim()); else reject(new Error(err || `ollama exited ${code}`));
    })
    proc.stdin.write(prompt);
    proc.stdin.end();
  })
}

app.post('/query', async (req, res) => {
  try {
    const q = (req.body?.query || '').toString();
    if (!q) return res.status(400).json({ error: 'missing query' })
    const answer = await runOllama(q);
    res.json({ prompt: q, answer });
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});

app.listen(PORT, () => console.log(`Ollama shim on :${PORT} using model ${MODEL}`));

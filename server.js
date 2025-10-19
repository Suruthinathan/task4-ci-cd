const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let pods = []; // in-memory array to store pods

// GET all pods
app.get('/api/pods', (req, res) => {
  res.json(pods);
});

// POST create a pod
app.post('/api/pods', (req, res) => {
  const { name, image } = req.body;
  if (!name || !image) return res.status(400).json({ error: 'Name and image required' });
  pods.push({ name, image, status: 'Running' });
  res.json({ message: 'Pod created', pod: { name, image, status: 'Running' } });
});

// DELETE a pod by name
app.delete('/api/pods/:name', (req, res) => {
  pods = pods.filter(p => p.name !== req.params.name);
  res.json({ message: 'Pod deleted' });
});

// ✅ NEW: Command Runner route
app.post('/api/command', (req, res) => {
  const { command } = req.body;

  // Simulated output for demo purposes
  const output = `Simulated output for command: "${command}"\nPod1   Running\nPod2   Pending\nPod3   Running`;

  res.json({ output });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

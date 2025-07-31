import express from 'express';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'streaming-bridge', timestamp: new Date().toISOString() });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'MONA x SPARK Streaming Bridge Service',
    version: '1.0.0',
    status: 'running'
  });
});

app.listen(PORT, () => {
  console.log(`🌊 Service Streaming Bridge démarré sur le port ${PORT}`);
}); 
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'analytics', timestamp: new Date().toISOString() });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'MONA x SPARK Analytics Service',
    version: '1.0.0',
    status: 'running'
  });
});

app.listen(PORT, () => {
  console.log(`📊 Service Analytics démarré sur le port ${PORT}`);
}); 
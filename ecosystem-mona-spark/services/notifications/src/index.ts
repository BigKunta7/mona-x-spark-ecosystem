import express from 'express';

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'notifications', timestamp: new Date().toISOString() });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'MONA x SPARK Notifications Service',
    version: '1.0.0',
    status: 'running'
  });
});

app.listen(PORT, () => {
  console.log(`🔔 Service Notifications démarré sur le port ${PORT}`);
}); 
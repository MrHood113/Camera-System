// src/index.ts
import express from 'express';
import { createServer } from 'http';
import { setupWebSocket } from './ws/wsHandler';
import { config } from './config/env';
import snapshotRoute from './routes/snapshotRoute';
import cors from 'cors';

const app = express();

const server = createServer(app);
setupWebSocket(server); // Kích hoạt websocket

app.get('/', (req, res) => {
  res.send('Live View Service is running...');
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', snapshotRoute);

server.listen(config.port, () => {
  console.log(`🚀 Live View Service is running on http://localhost:${config.port}`);
});

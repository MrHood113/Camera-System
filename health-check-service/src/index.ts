import dotenv from 'dotenv';
import express from 'express';
import cron from 'node-cron';
import { runHealthCheck } from './utils/healthCheck';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get('/health-check/manual', async (req, res) => {
  await runHealthCheck();
  res.send('✅ Health check done.');
});

cron.schedule('*/3 * * * *', async () => {
  console.log(`⏰ [CRON] Running health check at ${new Date().toISOString()}`);
  await runHealthCheck();
});

app.listen(port, () => {
  console.log(`🌐 Health Check Service running at http://localhost:${port}`);
  runHealthCheck(); // tùy chọn: auto-run khi khởi động
});

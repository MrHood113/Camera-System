import express from 'express';
import path from 'path';
import { captureRtspSnapshot, fetchHttpSnapshot } from '../utils/snapshot';

const router = express.Router();

router.get('/snapshot', async (req, res) => {
  const { url, type } = req.query;

  console.log(`[Snapshot Request] Type: ${type}, URL: ${url}`);

  if (!url || typeof url !== 'string' || !type || typeof type !== 'string') {
    return res.status(400).json({ message: 'Missing url or type' });
  }

  try {
    if (type === 'RTSP') {
      const buffer = await captureRtspSnapshot(url);
      console.log(`[Snapshot] RTSP snapshot size: ${buffer.length} bytes`);
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(buffer);
    } else if (type === 'HTTP') {
      const buffer = await fetchHttpSnapshot(url);
      console.log(`[Snapshot] HTTP snapshot size: ${buffer.length} bytes`);
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(buffer);
    } else if (type === 'PING') {
      const filePath = path.join(process.cwd(), 'public', 'ping-placeholder.png');
      console.log(`[Snapshot] Using placeholder at ${filePath}`);
      res.sendFile(filePath);
    } else {
        console.warn('[Snapshot] Invalid type:', type);
      res.status(400).json({ message: 'Invalid type' });
    }
  } catch (err) {
    console.error('Snapshot error:', err);
    res.status(500).json({ message: 'Snapshot failed' });
  }
});

export default router;

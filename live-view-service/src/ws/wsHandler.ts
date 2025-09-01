// src/websocket/wsHandler.ts
import { createServer, IncomingMessage } from 'http';
import { WebSocketServer } from 'ws';
import { handleDisconnect, handleMissing, handleStreamError, handleStreamStart, } from './clientHandler';
import { startStreaming } from '../stream/streamManager';

function extractCameraIdFromRequest(req: IncomingMessage): { cameraId: number | null, accessToken: string | null } {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  console.log('🌐 Full WebSocket URL:', req.url);
  const idParam = url.searchParams.get('cameraId');
  const accessToken = url.searchParams.get("token");
  return {
    cameraId: idParam ? parseInt(idParam, 10) : null,
    accessToken,
  };
}

export function setupWebSocket(server: ReturnType<typeof createServer>) {
  const wss = new WebSocketServer({ server });
  
  wss.on('connection', async(ws, req) => {
    console.log('🟢 New client connected');

    const { cameraId, accessToken } = extractCameraIdFromRequest(req); 
    console.error('accessToken', accessToken);

    if (!cameraId || !accessToken) {
      console.error('❌ Missing accessToken', accessToken);
      console.error('❌ Missing cameraId', cameraId);
      handleMissing(ws);
      return;
    }

    handleStreamStart(cameraId);

    try {
      console.log("🔴 Starting stream for camera ID:", cameraId);
      
      const ffmpeg = await startStreaming(cameraId, ws, accessToken);

      ws.on('close', () => {
        handleDisconnect(ws, cameraId)
        ffmpeg.kill('SIGINT');
      });
      console.log('✅ Streaming started successfully');
    } catch (err) {
      handleStreamError(ws, err);
    }
  });

  console.log('✅ WebSocket server is ready');
}



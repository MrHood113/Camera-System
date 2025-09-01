// clientHandler.ts
import { WebSocket } from 'ws';

export function handleDisconnect(ws: WebSocket, cameraId?: number) {
  console.log(`🔌 Client disconnected${cameraId ? ` for camera ID ${cameraId}` : ''}`);
}

export function handleMissing(ws: WebSocket) {
  console.log('⚠️ Missing cameraId');
  ws.send(JSON.stringify({ type: 'error', message: 'Missing cameraId' }));
  ws.close(1008, 'Missing cameraId');
}

export function handleStreamStart(cameraId: number) {
  console.log(`🔴 Starting live stream for camera ID: ${cameraId}`);
}

// export function handleInvalidCamera(ws: WebSocket, cameraId: number) {
//   console.log(`❌ Invalid cameraId: ${cameraId}`);
//   ws.send(JSON.stringify({
//     type: 'error',
//     message: `Camera ID ${cameraId} is invalid or not found`
//   }));
//   ws.close(1008, 'Invalid cameraId');
// }

export function handleStreamError(ws: WebSocket, error: unknown) {
  console.error('❌ Failed to start stream:', error);
  ws.close(1011, 'Stream failed');
}

export function logFFmpegClose(code: number | null): void {
  if (code === 0) {
    console.log('✅ FFmpeg exited normally with code 0');
  } else if (code !== null) {
    console.log(`❌ FFmpeg exited with error code ${code}`);
  } else {
    console.log('⚠️ FFmpeg exited with unknown (null) code');
  }
}

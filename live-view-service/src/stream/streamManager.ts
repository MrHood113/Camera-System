import { getStreamUrl } from '../api/streamUrlApi';
import { createFFmpegStream } from './ffmpeg';
import { WebSocket } from 'ws';
import { ChildProcessWithoutNullStreams } from 'child_process';

export async function startStreaming(
  
  cameraId: number,
  ws: WebSocket,
  accessToken: string
): Promise<ChildProcessWithoutNullStreams> {
  const streamUrl = await getStreamUrl(cameraId, accessToken);
  const ffmpeg = createFFmpegStream(streamUrl);

  ffmpeg.stdout.on('data', (chunk) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(chunk);
    }
  });

  return ffmpeg;
}

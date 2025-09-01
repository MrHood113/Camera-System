import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { logFFmpegClose } from '../ws/clientHandler';

export function createFFmpegStream(source: string): ChildProcessWithoutNullStreams {
  const ffmpeg = spawn('ffmpeg', [
    '-i', source,
    '-f', 'mpegts',   
    '-codec:v', 'mpeg1video',
    '-b:v', '500k',
    '-r', '80',
    '-'
  ], { stdio: ['pipe', 'pipe', 'pipe'] });

  ffmpeg.stderr.on('data', (data) => {
    const msg = data.toString();

    if (msg.toLowerCase().includes('error')) {
      console.error('🔴 FFmpeg ERROR:', msg);
    } else {
      console.log('🟡 FFmpeg log:', msg);
    }
  });

  ffmpeg.on('close', (code) => {
    logFFmpegClose(code);
  });

  return ffmpeg;
}

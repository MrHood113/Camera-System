import { exec as execCb } from 'child_process';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const exec = promisify(execCb);

export async function captureRtspSnapshot(url: string): Promise<Buffer> {
  const tmpPath = path.join('/tmp', `snapshot-${Date.now()}.jpg`);
  const cmd = `ffmpeg -rtsp_transport tcp -i "${url}" -frames:v 1 -q:v 2 -f image2 "${tmpPath}" -y`;
  console.log(`[RTSP] Running FFmpeg command:\n${cmd}`);

  await exec(cmd);
  const buffer = await fs.promises.readFile(tmpPath);
  console.log(`[RTSP] Snapshot saved at ${tmpPath}, size: ${buffer.length}`);
  fs.unlink(tmpPath, () => {}); // Cleanup
  return buffer;
}

export async function fetchHttpSnapshot(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch image');
  const arrBuf = await res.arrayBuffer();
  return Buffer.from(arrBuf);
}

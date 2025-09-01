import { exec } from 'child_process';
import axiosNoAuth from '../api/axiosNoAuth';
import ping from 'ping';
import axios, { AxiosResponse } from 'axios';
import { CameraHealthCheck } from 'models/cameraCheck.model';
import { HealthStatus } from 'models/cameraStatus.model';
import { detectType } from '../utils/detectType';

export async function checkCameraHealth(camera: CameraHealthCheck): Promise<HealthStatus> {
  const { ipAddress, streamUrl } = camera;
  const type = detectType(streamUrl || '');

  try {
    switch (type) {
      case 'HTTP':
        return await httpCheck(streamUrl);
      case 'PING':
        return await pingCheck(ipAddress);
      case 'RTSP':
        return await rtspCheck(streamUrl);
      default:
        return 'UNKNOWN';
    }
  } catch (error) {
    console.error(`❌ Error checking camera ${camera.id}:`, error);
    return 'UNREACHABLE';
  }
}

async function pingCheck(ip: string): Promise<HealthStatus> {
  console.log(`📍 PING check to IP: ${ip}`);
  const res = await ping.promise.probe(ip, { timeout: 3 });
  console.log(`🔁 PING result: ${res.alive ? 'ONLINE' : 'OFFLINE'}`);
  return res.alive ? 'ONLINE' : 'OFFLINE';
}

async function httpCheck(url: string): Promise<HealthStatus> {
  console.log(`🌐 HTTP check to URL: ${url}`);
  try {
    console.log(`⏳ Sending GET request to ${url}`);
    const res: AxiosResponse = await axiosNoAuth.get(url, {
      timeout: 5000,
      responseType: 'stream',
      maxRedirects: 3,
      validateStatus: () => true
    });
    const statusValid = res.status >= 200 && res.status < 400 ? 'ONLINE' : 'OFFLINE';

    const contentType = res.headers['content-type'] || '';
    const isMJPEG = contentType.includes('multipart/x-mixed-replace');

    console.log(`🔁 HTTP status: ${res.status}`);
    console.log(`📦 Content-Type: ${contentType}`);

    return statusValid && isMJPEG ? 'ONLINE' : 'OFFLINE';
  } catch(err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        // Error 401, 403, 500,...
        console.error(`❌ HTTP error response: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        // No response
        console.error(`❌ No response received:`, err.message);
      }
    } else if (err instanceof Error) {
      console.error(`❌ Unknown error:`, err.message);
    } else {
      console.error(`❌ Unknown error object:`, err);
    }
    return 'OFFLINE';
  }
}

async function rtspCheck(url: string): Promise<HealthStatus> {
  console.log(`🎥 RTSP check using ffprobe to URL: ${url}`);
  return new Promise((resolve) => {
    const cmd = `ffprobe -v error -rtsp_transport tcp -i "${url}" -select_streams v:0 -show_entries stream=codec_type -of csv=p=0`;
    exec(cmd, { timeout: 5000, maxBuffer: 1024 * 1024  }, (error, stdout) => {
      if (error) {
        console.error(`❌ ffprobe error:`, error.message);
        return resolve('OFFLINE');
      }
      console.log(`🔁 ffprobe output: ${stdout.trim()}`);
      resolve(stdout.trim() ? 'ONLINE' : 'OFFLINE');
    });
  });
}
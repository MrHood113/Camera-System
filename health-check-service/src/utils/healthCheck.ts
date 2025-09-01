import cameraApi from '../api/camera.api';
import { checkCameraHealth } from '../services/healthCheck.service';

export async function runHealthCheck() {
  console.log(`🚀 Starting health check job...`);

  const cameras = await cameraApi.getCameraToCheck();
  console.log(`📦 Total cameras to check: ${cameras.length}`);

  for (const camera of cameras) {
    const healthStatusEnum = await checkCameraHealth(camera);

    const status = {
      healthStatusEnum,
      lastPingAt: new Date().toISOString(),
      note: '', 
    };

    await cameraApi.updateHealthStatus(camera.id, status);
    console.log(`✅ [${camera.id}] ${camera.ipAddress} → ${status}`);
  }

  console.log(`🎉 Health check completed.`);
}

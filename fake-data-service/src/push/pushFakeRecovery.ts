import { generateSnapshots, getShelfRecovery } from "../fakers/index.js";
import redis from "../redis/redisClient.js";
import type { ShelfRecovery } from "../types/models.type";

export async function pushFakeRecovery() {
  const snapshots = generateSnapshots();
  const recovery: ShelfRecovery[] = snapshots.map((s) => getShelfRecovery(s));

  const payload = {
    recovery,
    pushTimestamp: new Date().toISOString(),
  };

  await redis.lpush("fake:recoveries", JSON.stringify(payload));
  console.log("Pushed recovery:", payload.pushTimestamp);
}

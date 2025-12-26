import { generateShelfRecovery } from "../fakers/index.js";
import redis from "../redis/redisClient.js";
import type { ShelfRecovery } from "../types/models.type";

export async function pushFakeRecovery() {
  const recoveries: ShelfRecovery[] = generateShelfRecovery();

  const payload = {
    recoveries,
    pushTimestamp: new Date().toISOString(),
  };

  await redis.lpush("fake:recoveries", JSON.stringify(payload));
  console.log("Pushed recovery:", payload.pushTimestamp);
}

import redis from "../redis/redisClient.js";
import { generateSnapshots } from "../fakers/fakeSnapshot.js";
import type { ShelfSnapshot } from "../types/models.type.js";

export async function pushFakeSnapshots() {
  const snapshots: ShelfSnapshot[] = generateSnapshots();

  const payload = {
    snapshots,
    pushTimestamp: new Date().toISOString(),
  };

  await redis.lpush("fake:snapshots", JSON.stringify(payload));
  console.log("Pushed snapshot:", payload.pushTimestamp);
}

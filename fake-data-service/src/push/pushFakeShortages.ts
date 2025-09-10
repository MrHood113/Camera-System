import { generateSnapshots, getShelfShortage } from "../fakers/index.js";
import redis from "../redis/redisClient.js";
import type { ShelfShortage } from "../types/models.type.js";

export async function pushFakeShortages() {
  const snapshots = generateSnapshots();

  const shortages: ShelfShortage[] = snapshots.map((s) => getShelfShortage(s));
//   const shortages: ShelfShortage[] = generateShelfShortage();

  const payload = {
    shortages,
    pushTimestamp: new Date().toLocaleString("sv-SE"),
  };

  await redis.lpush("fake:shortages", JSON.stringify(payload));
  console.log("Pushed shortage batch:", payload.pushTimestamp);
}

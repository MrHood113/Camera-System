import redis from "../redisClient.js";
import { generateSnapshots } from "../fakers/fakeSnapshot.js";

export async function pushFakeSnapshots() {
  const snapshots = generateSnapshots();

  const payload = {
    snapshots,
    pushTimestamp: new Date().toLocaleString("sv-SE"),
  };

  await redis.lpush("fake:snapshots", JSON.stringify(payload));
  console.log("Pushed snapshot batch:", payload.pushTimestamp);
}

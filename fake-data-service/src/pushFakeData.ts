import { generateAllShelves, generateStore } from "./fakers/index.js";
import redis from "./redisClient.js";
import type { FakePayload } from "./types/fakePayload.type";

// Generate data and push to Redis
export async function pushFakeData() {
  const stores = generateStore();
  const shelves = generateAllShelves();

  const data: FakePayload = {
    stores,
    shelves,
    pushTimestamp: new Date().toISOString(),
  };

  // Lưu vào Redis list "fake:data"
  await redis.lpush("fake:data", JSON.stringify(data));
  console.log("Pushed:", data.pushTimestamp);
}

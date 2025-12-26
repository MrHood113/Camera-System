import { generateAllShelves, generateStore } from "../fakers/index.js";
import redis from "../redis/redisClient.js";
import type { Shelf, Store } from "../types/models.type.js";

// Generate data and push to Redis
export async function pushFakeData() {
  const stores: Store[] = generateStore();
  const shelves: Shelf[] = generateAllShelves();

  const data = {
    stores,
    shelves,
    pushTimestamp: new Date().toISOString(),
  };

  await redis.lpush("fake:datas", JSON.stringify(data));
  console.log("Pushed data:", data.pushTimestamp);
}

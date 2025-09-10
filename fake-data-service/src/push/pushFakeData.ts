import { generateAllShelves, generateStore } from "../fakers/index.js";
import redis from "../redis/redisClient.js";

// Generate data and push to Redis
export async function pushFakeData() {
  const stores = generateStore();
  const shelves = generateAllShelves();

  const data = {
    stores,
    shelves,
    pushTimestamp: new Date().toISOString(),
  };

  await redis.lpush("fake:data", JSON.stringify(data));
  console.log("Pushed:", data.pushTimestamp);
}

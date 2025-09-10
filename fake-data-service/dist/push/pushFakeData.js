import { generateAllShelves, generateStore } from "../fakers/index.js";
import redis from "../redisClient.js";
// Generate data and push to Redis
export async function pushFakeData() {
    const stores = generateStore();
    const shelves = generateAllShelves();
    const data = {
        stores,
        shelves,
        pushTimestamp: new Date().toISOString(),
    };
    // Lưu vào Redis list "fake:data"
    await redis.lpush("fake:data", JSON.stringify(data));
    console.log("Pushed:", data.pushTimestamp);
}
//# sourceMappingURL=pushFakeData.js.map
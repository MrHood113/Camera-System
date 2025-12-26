import { generateCustomerVisits } from "../fakers/index.js";
import redis from "../redis/redisClient.js";
import type { CustomerVisit } from "../types/models.type";

export async function pushFakeCustomerVisit() {
  const customerVisits: CustomerVisit[] = generateCustomerVisits();

  const payload = {
    customerVisits,
    pushTimestamp: new Date().toISOString(),
  };

  await redis.lpush("fake:customers", JSON.stringify(payload));
  console.log("Pushed customers:", payload.pushTimestamp);
}
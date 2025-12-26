import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL ?? "redis://localhost:6379" });

client.on("error", (err) => console.error("Redis Client Error", err));

await client.connect();

export async function subscribeRedis(channel: string, cb: (msg: any) => void) {
  const sub = client.duplicate();
  await sub.connect();
  await sub.subscribe(channel, (message) => {
    try {
      cb(JSON.parse(message));
    } catch (e) {
      console.error("❌ Invalid message", message, e);
    }
  });
}

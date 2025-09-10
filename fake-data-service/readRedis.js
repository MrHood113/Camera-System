import { createClient } from "redis";

async function main() {
  // Kết nối Redis
  const client = createClient({
    url: "redis://localhost:6379" // vì bạn đã map port 6379
  });

  client.on("error", (err) => console.error("Redis Client Error", err));

  await client.connect();

  const data = await client.lRange("fake:snapshots", 0, -1);

  console.log("📌 Raw data from Redis:");
  console.log(data);

  // Parse JSON từng phần tử
  const parsed = data.map(item => {
    try {
      return JSON.parse(item);
    } catch (e) {
      return { error: "Invalid JSON", raw: item };
    }
  });

  console.log("\n✅ Parsed data:");
  console.dir(parsed, { depth: null });

  await client.quit();
}

main();

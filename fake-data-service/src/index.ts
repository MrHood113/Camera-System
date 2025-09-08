import redis from "./redisClient";
// import { generateOsaMeasurement } from "./faker";

async function pushFakeData() {
  const data = generateOsaMeasurement();
  await redis.lpush("osa_measurements", JSON.stringify(data));
  console.log("Pushed:", data);
}

// 30 phút 1 lần
setInterval(pushFakeData, 30 * 60 * 1000);

// chạy lần đầu tiên ngay khi start service
pushFakeData();

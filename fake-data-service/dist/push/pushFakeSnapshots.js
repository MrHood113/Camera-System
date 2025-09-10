import redis from "../redisClient.js";
import { generateSnapshots } from "../fakers/fakeSnapshot.js";
export async function pushFakeSnapshots() {
    const snapshots = generateSnapshots();
    const payload = {
        type: "snapshot",
        pushTimestamp: new Date().toISOString(),
        snapshots,
    };
    await redis.lpush("fake:snapshots", JSON.stringify(payload));
    console.log("Pushed snapshot batch:", payload.pushTimestamp);
}
//# sourceMappingURL=pushFakeSnapshots.js.map
import dayjs from "dayjs";
import { generateSnapshots } from "./fakeSnapshot.js";
const shortageState = {};
export function getShelfShortage(snapshot) {
    const shelfId = snapshot.shelfId;
    const now = dayjs(snapshot.timestamp);
    const openTime = now.hour(8).minute(0).second(0);
    const closeTime = now.hour(20).minute(0).second(0);
    const shortagePercent = ((snapshot.expectedItems - snapshot.currentItems) / snapshot.expectedItems) * 100;
    // let shelfOperatingHours = 0;
    if (!shortageState[shelfId]) {
        shortageState[shelfId] = { operatingHours: 0, shortageHours: 0, aboveThreshold: 0 };
    }
    if (now.isAfter(openTime) && now.isBefore(closeTime)) {
        shortageState[shelfId].operatingHours += 1 / 3600;
        if (snapshot.currentItems < snapshot.expectedItems) {
            shortageState[shelfId].shortageHours += 1 / 3600;
        }
        if (shortagePercent >= 20) {
            shortageState[shelfId].aboveThreshold += 1 / 3600;
        }
    }
    return {
        id: undefined,
        shelfId,
        shelfOperatingHours: shortageState[shelfId].operatingHours,
        shelfShortageHours: shortageState[shelfId].shortageHours,
        durationAboveThreshold: shortageState[shelfId].aboveThreshold,
    };
}
export function generateShelfShortage() {
    const snapshots = generateSnapshots();
    return snapshots.map((snapshot) => getShelfShortage(snapshot));
}
//# sourceMappingURL=fakeShelfShortage.js.map
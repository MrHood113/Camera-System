import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { ShelfShortage, ShelfSnapshot } from "../types/models.type";
import { generateSnapshots } from "./fakeSnapshot.js";

const shortageState: Record<number, { operatingHours: number; shortageHours: number; aboveThreshold: number }> = {};

export function getShelfShortage(snapshot: ShelfSnapshot): ShelfShortage {
  const shelfId = snapshot.shelfId;

  const now: Dayjs = dayjs(snapshot.timestamp);
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

export function generateShelfShortage(): ShelfShortage[] {
  const snapshots: ShelfSnapshot[] = generateSnapshots();
  return snapshots.map((snapshot) => getShelfShortage(snapshot));
}

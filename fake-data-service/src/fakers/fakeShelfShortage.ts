import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { ShelfShortage, ShelfSnapshot } from "../types/models.type";
import { generateSnapshots } from "./fakeSnapshot.js";

let globalId = 1;

const shortageState: Record<number, Record<string,{ operatingHours: number; shortageHours: number; aboveThreshold: number }>> = {};

export function getShelfShortage(snapshot: ShelfSnapshot): ShelfShortage {
  const shelfId = snapshot.shelfId;

  const now: Dayjs = dayjs(snapshot.timestamp);
  const eventDate = now.format("YYYY-MM-DD");
  const openTime = now.hour(8).minute(0).second(0);
  const closeTime = now.hour(20).minute(0).second(0);

  const shortagePercent = ((snapshot.expectedItems - snapshot.currentItems) / snapshot.expectedItems) * 100;

  if (!shortageState[shelfId]) {
    shortageState[shelfId] = {};
  }

  if (!shortageState[shelfId][eventDate]) {
    shortageState[shelfId][eventDate] = { operatingHours: 0, shortageHours: 0, aboveThreshold: 0 };
  }

  if (now.isAfter(openTime) && now.isBefore(closeTime)) {
    const state = shortageState[shelfId][eventDate];
    state.operatingHours += 1 / 3600;

    if (snapshot.currentItems < snapshot.expectedItems) {
        state.shortageHours += 1 / 3600;
    }
    
    if (shortagePercent >= 20) {
        state.aboveThreshold += 1 / 3600;
    }
  }

  return {
    id: globalId++,
    shelfId,
    shelfOperatingHours: shortageState[shelfId][eventDate].operatingHours,
    shelfShortageHours: shortageState[shelfId][eventDate].shortageHours, 
    durationAboveThreshold: shortageState[shelfId][eventDate].aboveThreshold, 
    eventTimestamp: snapshot.timestamp,
  };
}

export function generateShelfShortage(): ShelfShortage[] {
  const snapshots: ShelfSnapshot[] = generateSnapshots();
  return snapshots.map((snapshot) => getShelfShortage(snapshot));
}

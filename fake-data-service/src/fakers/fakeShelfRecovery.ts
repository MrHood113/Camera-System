import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { ShelfRecovery, ShelfSnapshot } from "../types/models.type";
import { generateSnapshots } from "./fakeSnapshot.js";

let globalId = 1;

const recoveryState: Record<number, Record<string,{ 
    replenishmentAlerts: number; 
    onTimeRecoveries: number;         
    lateRecoveries: number ;
    activeAlert?: {
        startTime: Dayjs;
        durationMinutes: number;
    };
}>> = {};

export function getShelfRecovery(snapshot: ShelfSnapshot): ShelfRecovery {
    const shelfId = snapshot.shelfId;

    const now: Dayjs = dayjs(snapshot.timestamp);
    const eventDate = now.format("YYYY-MM-DD");
    const openTime = now.hour(8).minute(0).second(0);
    const closeTime = now.hour(20).minute(0).second(0);

    const shortagePercent = ((snapshot.expectedItems - snapshot.currentItems) / snapshot.expectedItems) * 100;
    
    if (!recoveryState[shelfId]) {
        recoveryState[shelfId] = {};
    }

    if (!recoveryState[shelfId][eventDate]) {
        recoveryState[shelfId][eventDate] = { replenishmentAlerts: 0, onTimeRecoveries: 0, lateRecoveries: 0 };
    }
    
    const state = recoveryState[shelfId][eventDate];

    if (now.isAfter(openTime) && now.isBefore(closeTime)) {
        if (shortagePercent >= 20) {
            if (!state.activeAlert) {
                state.activeAlert = { startTime: now, durationMinutes: 0};
                state.replenishmentAlerts++;
            } else {
                state.activeAlert.durationMinutes += 1 / 60;
            }
        } else {
            if (state.activeAlert) {
                if (state.activeAlert.durationMinutes <= 20) {
                    state.onTimeRecoveries++;
                } else {
                    state.lateRecoveries++;
                }

                delete state.activeAlert;
            }
        }
    }

    return {
        id: globalId++,
        shelfId,            
        replenishmentAlerts: recoveryState[shelfId][eventDate].replenishmentAlerts,
        onTimeRecoveries: recoveryState[shelfId][eventDate].onTimeRecoveries,
        lateRecoveries: recoveryState[shelfId][eventDate].lateRecoveries,
        eventTimestamp: snapshot.timestamp,
    }
}

export function generateShelfRecovery(): ShelfRecovery[] {
  const snapshots: ShelfSnapshot[] = generateSnapshots();
  return snapshots.map((snapshot) => getShelfRecovery(snapshot));
}

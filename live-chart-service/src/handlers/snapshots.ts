// import type { ShelfSnapshot } from "../types.js";

import type { ShelfSnapshot } from "../types/models.type.js";

export function handleSnapshots(payload: any) {
  const snapshots: ShelfSnapshot[] = payload.snapshots ?? [];

  const totalShelves = snapshots.length;
  const totalExpected = snapshots.reduce((sum, s) => sum + s.expectedItems, 0);
  const totalCurrent = snapshots.reduce((sum, s) => sum + s.currentItems, 0);

  const osaRate = totalExpected > 0 ? (totalCurrent / totalExpected) * 100 : 0;

  return {
    ts: payload.pushTimestamp,
    totalShelves,
    osaRate: osaRate.toFixed(2),
  };
}

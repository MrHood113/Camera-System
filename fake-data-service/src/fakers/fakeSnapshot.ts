import { faker } from '@faker-js/faker';
import type { ShelfSnapshot } from '../types/models.type';


function getExpectedItems(): number {
  return faker.helpers.arrayElement([50, 60, 70, 80, 90, 100]);
}

function getSnapshot(id: number, shelfId: number): ShelfSnapshot {
  const expectedItems = getExpectedItems();
  const currentItems = faker.number.int({ min: 0, max: expectedItems });
  
  return {
    id,
    shelfId,
    expectedItems: expectedItems,
    currentItems: currentItems,
    timestamp: new Date().toLocaleString("sv-SE"),
  };
}

export function generateSnapshots(): ShelfSnapshot[] {
  const snapshots: ShelfSnapshot[] = [];

  for (let i = 1; i <= 125; i++) {
    snapshots.push(getSnapshot(i, i));
  }

  return snapshots;
}

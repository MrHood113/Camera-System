import { faker } from '@faker-js/faker';
import type { Shelf, ShelfSnapshot } from '../types/models.type';
import { generateAllShelves } from './fakeShelf.js';

const shelfState: Record<number, { lastUpdate: number; currentItems: number }> = {};
let globalId = 1;

const getExpectedItems: (Shelf & { expectedItems: number })[] = generateAllShelves().map((shelf) => ({
    ...shelf,
    expectedItems: faker.helpers.arrayElement([50, 60, 70, 80, 90, 100]),
  }));

export function getSnapshot(shelf: Shelf & { expectedItems: number }): ShelfSnapshot {
  const now = Date.now();
  const interval = 15 * 60 * 1000;
  if (!shelfState[shelf.id!] || now - shelfState[shelf.id]!.lastUpdate >= interval) {
    shelfState[shelf.id!] = {
      lastUpdate: now,
      currentItems: faker.number.int({ min: 0, max: shelf.expectedItems }),
    };
  }
  
  return {
    id: globalId++,
    shelfId: shelf.id!,
    expectedItems: shelf.expectedItems,
    currentItems: shelfState[shelf.id]!.currentItems,
    timestamp: new Date().toISOString(),
  };
}

export function generateSnapshots(): ShelfSnapshot[] {
  return getExpectedItems.map((shelf) => getSnapshot(shelf));
}

import { faker } from '@faker-js/faker';
import type { Shelf, ShelfSnapshot } from '../types/models.type';
import { generateAllShelves } from './fakeShelf.js';


export function getExpectedItems(): number {
  return faker.helpers.arrayElement([50, 60, 70, 80, 90, 100]);
}

export function getSnapshot(id: number, shelfId: number): ShelfSnapshot {
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
  const shelves: Shelf[] = generateAllShelves();

  shelves.forEach((shelf, index) => {
    snapshots.push(getSnapshot(index + 1, shelf.id!));
  });

  return snapshots;
}

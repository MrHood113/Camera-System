import { faker } from '@faker-js/faker';
import { generateAllShelves } from './fakeShelf';
// import { generateAllShelves } from './fakeShelf.js';
export function getExpectedItems() {
    return faker.helpers.arrayElement([50, 60, 70, 80, 90, 100]);
}
export function getSnapshot(id, shelfId) {
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
export function generateSnapshots() {
    const snapshots = [];
    const shelves = generateAllShelves();
    shelves.forEach((shelf, index) => {
        snapshots.push(getSnapshot(index + 1, shelf.id));
    });
    return snapshots;
}
//# sourceMappingURL=fakeSnapshot.js.map
import { faker } from '@faker-js/faker';
function getExpectedItems() {
    return faker.helpers.arrayElement([50, 60, 70, 80, 90, 100]);
}
function getSnapshot(id, shelfId) {
    const expectedItems = getExpectedItems();
    const currentItems = faker.number.int({ min: 0, max: expectedItems });
    return {
        id,
        shelfId,
        expectedItems: expectedItems,
        currentItems: currentItems,
        timestamp: new Date().toISOString(),
    };
}
export function generateSnapshots() {
    const snapshots = [];
    for (let i = 1; i <= 125; i++) {
        snapshots.push(getSnapshot(i, i));
    }
    return snapshots;
}
//# sourceMappingURL=fakeSnapshot.js.map
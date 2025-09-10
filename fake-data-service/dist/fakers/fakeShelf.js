const Areas = [
    "Beverages",
    "Fresh food",
    "Household goods",
    "Packaged Food",
    "Personal care",
];
// Generate 25 shelves (5 areas x 5 shelves) per store
export function generateShelvesForStore(storeId) {
    const shelves = [];
    Areas.forEach((area) => {
        for (let i = 1; i <= 5; i++) {
            shelves.push({
                storeId,
                shelfName: `${area} - Shelf ${i}`,
                category: area,
            });
        }
    });
    return shelves;
}
// Generate shelves for all stores (125 shelves total)
export function generateAllShelves() {
    const shelves = [];
    for (let storeId = 1; storeId <= 5; storeId++) {
        shelves.push(...generateShelvesForStore(storeId));
    }
    return shelves;
}
//# sourceMappingURL=fakeShelf.js.map
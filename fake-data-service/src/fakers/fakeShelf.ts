import type { Shelf, Store } from "../types/models.type";
import { generateStore } from "./fakeStore.js";

const Areas = [
  "Beverages",
  "Fresh food",
  "Household goods",
  "Packaged Food",
  "Personal care",
];

let globalId = 1;

// Generate 25 shelves (5 areas x 5 shelves) per store
export function generateShelvesForStore(storeId: number): Shelf[] {
  const shelves: Shelf[] = [];

  Areas.forEach((area) => {
    for (let i = 1; i <= 5; i++) {
      shelves.push({
        id: globalId++,
        storeId,
        shelfName: `${area} - Shelf ${i}`,
        category: area,
      });
    }
  });

  return shelves;
}

// Generate shelves for all stores (125 shelves total)
export function generateAllShelves(): Shelf[] {
  const shelves: Shelf[] = [];
  const stores: Store[] = generateStore();

  stores.forEach((store) => {
    shelves.push(...generateShelvesForStore(store.id!));
  });

  return shelves;
}

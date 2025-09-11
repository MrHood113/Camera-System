export interface Store {
    id?: number;
    storeName: string;
    location?: string;
    shelves?: Shelf[];
}
export interface Shelf {
    id?: undefined | number;
    shelfName: string;
    category?: string;
    storeId: number;
}
export interface ShelfSnapshot {
    id?: undefined | number;
    shelfId: number;
    expectedItems: number;
    currentItems: number;
    timestamp: string;
}
export interface ShelfRecovery {
    id?: undefined | number;
    shelfId: number;
    totalReplenishmentAlerts: number;
    onTimeRecoveries: number;
    lateRecoveries: number;
}
export interface ShelfShortage {
    id?: undefined | number;
    shelfId: number;
    shelfOperatingHours: number;
    shelfShortageHours: number;
    durationAboveThreshold: number;
}
export interface CustomerVisit {
    id?: undefined | number;
    storeId: number;
    ageGroup?: string;
    gender?: string;
    shelfShortageVisit: number;
    storeVisit: number;
}
//# sourceMappingURL=models.type.d.ts.map
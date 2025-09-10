export interface Store {
    id?: number;
    storeName: string;
    location?: string;
    shelves?: Shelf[];
}
export interface Shelf {
    id?: number;
    shelfName: string;
    category?: string;
    storeId: number;
}
export interface ShelfSnapshot {
    id?: number;
    shelfId: number;
    expectedItems: number;
    currentItems: number;
    timestamp: string;
}
export interface ShelfRecovery {
    id?: number;
    shelfId: number;
    totalReplenishmentAlerts: number;
    onTimeRecoveries: number;
    lateRecoveries: number;
}
export interface ShelfShortage {
    id?: number;
    shelfId: number;
    totalOperatingHours: number;
    totalShortageHours: number;
    durationAboveThreshold: number;
}
export interface CustomerVisit {
    id?: number;
    storeId: number;
    ageGroup?: string;
    gender?: string;
    shelfShortageVisit: number;
    storeVisit: number;
}
//# sourceMappingURL=models.type.d.ts.map
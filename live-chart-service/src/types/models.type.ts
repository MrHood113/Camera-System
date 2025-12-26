// Store
export interface Store {
  id?: number;          
  storeName: string;    
  location?: string;  
  shelves?: Shelf[];   
}

// Shelf
export interface Shelf {
  id: number;
  shelfName: string;   
  category?: string;  
  storeId: number;      
}

// Shelf Snapshot
export interface ShelfSnapshot {
  id?: number;
  shelfId: number;          
  expectedItems: number;   
  currentItems: number;       
  timestamp: string;     
}

// Shelf Recovery
export interface ShelfRecovery {
  id?: number;
  shelfId: number;              
  replenishmentAlerts: number;
  onTimeRecoveries: number;
  lateRecoveries: number; 
  eventTimestamp: string;             
}

// Shelf Shortage
export interface ShelfShortage {
  id?: number;
  shelfId: number;            
  shelfOperatingHours: number; 
  shelfShortageHours: number;     
  durationAboveThreshold: number;   
  eventTimestamp: string;       
}

// Customer Visit
export interface CustomerVisit {
  id?: number;
  storeId: number;            
  totalStoreVisits: number;
  totalShortageVisits: number;
  ageGenderVisits?: AgeGenderVisit[];
}

// Age + Gender Visit
export interface AgeGenderVisit {
  id?: number;
  customerVisitId: number;
  ageGroup: string; 
  gender: string;   
  storeVisits: number;
  shortageVisits: number;
}
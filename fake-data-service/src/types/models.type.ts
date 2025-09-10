// Store
export interface Store {
  id?: number;          
  storeName: string;    
  location?: string;  
  shelves?: Shelf[];   
}

// Shelf
export interface Shelf {
  id?: undefined | number;
  shelfName: string;   
  category?: string;  
  storeId: number;      
}

// Shelf Snapshot
export interface ShelfSnapshot {
  id?: undefined | number;
  shelfId: number;          
  expectedItems: number;   
  currentItems: number;       
  timestamp: string;     
}

// Shelf Recovery
export interface ShelfRecovery {
  id?: undefined | number;
  shelfId: number;              
  totalReplenishmentAlerts: number;
  onTimeRecoveries: number;
  lateRecoveries: number;              
}

// Shelf Shortage
export interface ShelfShortage {
  id?: undefined | number;
  shelfId: number;            
  shelfOperatingHours: number; 
  shelfShortageHours: number;     
  durationAboveThreshold: number;          
}

// Customer Visit
export interface CustomerVisit {
  id?: undefined | number;
  storeId: number;            
  ageGroup?: string;      
  gender?: string;        
  shelfShortageVisit: number; 
  storeVisit: number; 
}

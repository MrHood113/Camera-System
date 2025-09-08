// Store
export interface Store {
  id?: number;          
  storeName: string;    
  location?: string;  
  shelves?: Shelf[];   
}

// Shelf
export interface Shelf {
  id?: number;
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
  totalReplenishmentAlerts: number;
  onTimeRecoveries: number;
  timestamp: string;             
}

// Shelf Shortage
export interface ShelfShortage {
  id?: number;
  shelfId: number;            
  totalOperatingHours: number; 
  shortageHours: number;      
  timestamp: string;          
}

// Customer Visit
export interface CustomerVisit {
  id?: number;
  storeId: number;        
  visitTime: string;     
  ageGroup?: string;      
  gender?: string;        
  duringShortage: boolean; 
}

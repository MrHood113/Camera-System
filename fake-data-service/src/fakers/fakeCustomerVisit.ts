import type { AgeGenderVisit, CustomerVisit, Store } from "../types/models.type";
import { generateAgeGenderVisits, generateStore } from "./index.js";

let globalId = 1;

export function getCustomerVisit(store: Store): CustomerVisit {
  const storeId = store.id!;
  const customerVisitId = globalId++;

  const ageGenderVisits: AgeGenderVisit[] = generateAgeGenderVisits(customerVisitId);
  
  const totalStoreVisits = ageGenderVisits.reduce((sum, visit) => sum + visit.storeVisits, 0);
  const totalShortageVisits = ageGenderVisits.reduce((sum, visit) => sum + visit.shortageVisits, 0);

  const customerVisit: CustomerVisit = {
    id: globalId++,
    storeId,
    totalStoreVisits,
    totalShortageVisits,
    ageGenderVisits: [], 
  };

  customerVisit.ageGenderVisits = ageGenderVisits.map((v) => ({
    ...v,
    customerVisitId: customerVisit.id!,
  }));

  return customerVisit;
}

export function generateCustomerVisits(): CustomerVisit[] {
  const stores: Store[] = generateStore();
  return stores.map((store) => getCustomerVisit(store));
}

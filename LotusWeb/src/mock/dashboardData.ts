// src/mock/dashboardData.ts
import { faker } from '@faker-js/faker';

// Interface để type-safe
export interface ShelfMetric {
  shelfName: string;
  operatingHours: number;
  shortageHours: number;
  shortageRate: number;
  alertsCount: number;
  replenishmentsCount: number;
}

export interface OSARateByHour {
  hour: string;
  osaRate: number;
  shelfName: string;
}

export interface CustomerVisit {
  ageGroup: string;
  gender: 'Male' | 'Female';
  visitCount: number;
}

export interface WeeklyShortage {
  week: string;
  shortageRate: number; 
  recoveryRate: number; 
}

export interface ShortageByCategory {
  category: string; 
  shortagePercent: number;
  recoveryPercent: number;
}

export interface LostSales {
  averageShortageRate: number;
  onTimeRecoveryRate: number;
  potentialLost: number; 
}

// Mock data dựa trên hình ảnh
export const shelfMetrics: ShelfMetric[] = [
  { shelfName: 'Energy Drink Shelf', operatingHours: 4, shortageHours: 0.7, shortageRate: 17.5, alertsCount: 3, replenishmentsCount: 2 },
  { shelfName: 'Fresh Produce Shelf 1', operatingHours: 4, shortageHours: 0.4, shortageRate: 10, alertsCount: 1, replenishmentsCount: 1 },
  { shelfName: 'Medicine Shelf 1', operatingHours: 4, shortageHours: 0.5, shortageRate: 12.5, alertsCount: 1, replenishmentsCount: 1 },
  // Thêm đến 10 shelves, dùng faker cho random
  ...Array.from({ length: 7 }, () => ({
    shelfName: faker.commerce.department() + ' Shelf',
    operatingHours: faker.number.int({ min: 4, max: 24 }),
    shortageHours: faker.number.float({ min: 0.1, max: 5, fractionDigits: 1 }),
    shortageRate: faker.number.float({ min: 5, max: 30, fractionDigits: 1 }),
    alertsCount: faker.number.int({ min: 0, max: 5 }),
    replenishmentsCount: faker.number.int({ min: 0, max: 3 }),
  })),
];

export const osaRatesByHour: OSARateByHour[] = Array.from({ length: 9 }, (_, i) => ({
  hour: `${String(i + 8).padStart(2, '0')}:00`, 
  osaRate: faker.number.float({ min: 60, max: 100, fractionDigits: 1 }),
  shelfName: faker.helpers.arrayElement(shelfMetrics.map(s => s.shelfName)),
}));

export const customerVisits: CustomerVisit[] = [
  { ageGroup: '10-19', gender: 'Male', visitCount: 10000 },
  { ageGroup: '10-19', gender: 'Female', visitCount: 5000 },
  { ageGroup: '20-29', gender: 'Male', visitCount: 11400 },
  { ageGroup: '20-29', gender: 'Female', visitCount: 5900 },
  { ageGroup: '30-39', gender: 'Male', visitCount: 5000 },
  { ageGroup: '30-39', gender: 'Female', visitCount: 2000 },
  { ageGroup: '40-49', gender: 'Male', visitCount: 15000 },
  { ageGroup: '40-49', gender: 'Female', visitCount: 9000 },
];

export const weeklyShortages: WeeklyShortage[] = [
  { week: 'August 1', shortageRate: 20, recoveryRate: 70 },
  { week: 'August 2', shortageRate: 18, recoveryRate: 65 },
  { week: 'August 3', shortageRate: 22, recoveryRate: 60 },
  { week: 'August 4', shortageRate: 19, recoveryRate: 68 },
  { week: 'August 5', shortageRate: 25, recoveryRate: 63 },
];

export const shortageByCategories: ShortageByCategory[] = [
  { category: 'Beverages', shortagePercent: 30, recoveryPercent: 40 },
  { category: 'Fresh Food', shortagePercent: 20, recoveryPercent: 30 },
  { category: 'Household goods', shortagePercent: 15, recoveryPercent: 25 },
  { category: 'Packaged Food', shortagePercent: 10, recoveryPercent: 20 },
  { category: 'Personal care', shortagePercent: 25, recoveryPercent: 35 },
];

export const lostSales: LostSales = {
  averageShortageRate: 25,
  onTimeRecoveryRate: 63,
  potentialLost: faker.number.int({ min: 1000, max: 10000 }),
};
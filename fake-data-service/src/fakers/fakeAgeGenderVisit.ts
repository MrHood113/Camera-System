import { faker } from "@faker-js/faker";
import type { AgeGenderVisit } from "../types/models.type";

const ageGroups = [
    "10-19", 
    "20-29", 
    "30-39", 
    "40-49",
];

const genders = ["Male", "Female"];

let globalId = 1;

export function getAgeGenderVisit(customerVisitId: number, ageGroup: string, gender: string): AgeGenderVisit {
  const storeVisits = faker.number.int({ min: 4000, max: 10000 });
  const shortageVisits = faker.number.int({
    min: 0,
    max: Math.floor(storeVisits * 0.2),
  });

  return {
    id: globalId++,
    customerVisitId,
    ageGroup,
    gender,
    storeVisits,
    shortageVisits,
  };
}

export function generateAgeGenderVisits(customerVisitId: number): AgeGenderVisit[] {
  return ageGroups.flatMap((group) =>
    genders.map((gender) => getAgeGenderVisit(customerVisitId, group, gender))
  );
}

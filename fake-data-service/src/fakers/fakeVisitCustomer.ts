import { faker } from "@faker-js/faker";
import type { CustomerVisit } from "../types/models.type.js";

const AgeGroups = ["10-19", "20-29", "30-39", "40-49"];
const Genders = ["Male", "Female"];

export function getCustomerVisits(storeId: number): CustomerVisit[] {
  const totalStoreVisit = faker.number.int({ min: 4500, max: 10000 });

  // Chia theo giới tính
  const maleRatio = faker.number.int({ min: 45, max: 55 }) / 100; // ~50%
  const femaleRatio = 1 - maleRatio;

  const maleVisits = Math.round(totalStoreVisit * maleRatio);
  const femaleVisits = totalStoreVisit - maleVisits;

  // Tạo phân bổ cho từng nhóm tuổi trong mỗi giới tính
  Genders.forEach((gender, index) => {
    const genderTotal = gender === "Male" ? maleVisits : femaleVisits;

    // phân bổ % theo nhóm tuổi (random nhưng phải đủ tổng 100%)
    const ageDistribution = faker.helpers.multiple(
      () => faker.number.int({ min: 15, max: 35 }),
      { count: AgeGroups.length }
    );
    const sum = ageDistribution.reduce((a, b) => a + b, 0);

    AgeGroups.forEach((age, i) => {
      const storeVisit = Math.round((ageDistribution[i] / sum) * genderTotal);

      // Shelf shortage visit: khoảng 10–30% của store visit
      const shelfShortageVisit = Math.round(
        storeVisit * faker.number.int({ min: 10, max: 30 }) / 100
      );
    });
  });

  return {
    storeId,
    ageGroup: age,
    gender,
    storeVisit,
    shelfShortageVisit,
  };
}

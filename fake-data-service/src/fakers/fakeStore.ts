import type { Store } from "../types/models.type";

const StoreLocation = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
];

export function generateStore(): Store[] {
  return StoreLocation.map((city, index) => ({
    id: index + 1,
    storeName: `Store ${index + 1}`,
    location: city,
  }));
}

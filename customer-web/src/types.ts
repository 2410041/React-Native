export type Category = {
  id: string;
  name: string;
};

export type Store = {
  id: string;
  code: string;
  name: string;
  address: string;
  businessHours: string;
  categories: Category[];
};

export type ProductStatus = {
  code: "available" | "unavailable" | "unknown";
  label: string;
  message: string;
};

export type ProductSummary = {
  id: string;
  name: string;
  janCode?: string;
  category: Category;
  status: ProductStatus;
};

export type ProductLocation = {
  aisleNumber: number;
  sectionName: string;
  landmark: string;
  nearbyProducts: string[];
};

export type ProductDetail = {
  id: string;
  storeId: string;
  janCode: string;
  name: string;
  category: Category;
  location: ProductLocation;
  status: ProductStatus;
  updatedAt: string;
};

export type StoreMapAisle = {
  aisleNumber: number;
  sectionName: string;
  categoryId: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type StoreMap = {
  storeId: string;
  entrance: { x: number; y: number };
  aisles: StoreMapAisle[];
};

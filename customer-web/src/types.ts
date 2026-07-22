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
  // APIによってはカテゴリを含めない/削除済みカテゴリでnullを返すことがあるため欠損を許容する
  category: Category | null;
  status: ProductStatus;
};

export type ProductLocation = {
  aisleNumber: number | null;
  sectionName: string;
  landmark: string;
  nearbyProducts: string[];
};

export type ProductDetail = {
  id: string;
  storeId: string;
  janCode: string;
  name: string;
  category: Category | null;
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

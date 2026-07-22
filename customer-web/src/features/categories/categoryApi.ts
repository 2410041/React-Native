import { apiGet } from "@/services/apiClient";
import type { Category, ProductStatus, ProductSummary } from "@/types";

// GET /categories/:id/products の実レスポンスは検索APIと異なり、商品ごとに
// ネストした category オブジェクトを持たず、フラットな categoryId のみを返す。
// （検索API: { category: {id,name} }、カテゴリ別API: { categoryId: string }）
type CategoryProductsRawItem = {
  id: string;
  name: string;
  janCode?: string;
  categoryId?: string;
  category?: Category | null;
  status: ProductStatus;
};

type CategoryProductsRawResponse = {
  category: Category;
  products: CategoryProductsRawItem[];
};

function normalizeCategoryProduct(raw: CategoryProductsRawItem, fallbackCategory: Category): ProductSummary {
  const category = raw.category ?? (raw.categoryId === fallbackCategory.id ? fallbackCategory : null);
  return {
    id: raw.id,
    name: raw.name,
    janCode: raw.janCode,
    category,
    status: raw.status,
  };
}

export function fetchCategories(signal?: AbortSignal): Promise<{ categories: Category[] }> {
  return apiGet<{ categories: Category[] }>("/categories", { signal });
}

export async function fetchCategoryProducts(
  categoryId: string,
  storeId: string,
  signal?: AbortSignal
): Promise<{ category: Category; products: ProductSummary[] }> {
  const raw = await apiGet<CategoryProductsRawResponse>(
    `/categories/${encodeURIComponent(categoryId)}/products`,
    { signal, params: { storeId } }
  );

  return {
    category: raw.category,
    products: (raw.products ?? []).map((item) => normalizeCategoryProduct(item, raw.category)),
  };
}

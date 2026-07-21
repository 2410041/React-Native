import { apiGet } from "@/services/apiClient";
import type { Category, ProductSummary } from "@/types";

export function fetchCategories(signal?: AbortSignal): Promise<{ categories: Category[] }> {
  return apiGet<{ categories: Category[] }>("/categories", { signal });
}

export function fetchCategoryProducts(
  categoryId: string,
  storeId: string,
  signal?: AbortSignal
): Promise<{ category: Category; products: ProductSummary[] }> {
  return apiGet<{ category: Category; products: ProductSummary[] }>(
    `/categories/${encodeURIComponent(categoryId)}/products`,
    { signal, params: { storeId } }
  );
}

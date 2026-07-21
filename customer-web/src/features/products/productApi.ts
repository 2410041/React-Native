import { apiGet } from "@/services/apiClient";
import type { ProductDetail, ProductSummary } from "@/types";

export function searchProducts(
  params: { storeId: string; keyword?: string; categoryId?: string },
  signal?: AbortSignal
): Promise<{ keyword: string; products: ProductSummary[] }> {
  return apiGet<{ keyword: string; products: ProductSummary[] }>("/products/search", {
    signal,
    params: {
      storeId: params.storeId,
      keyword: params.keyword,
      categoryId: params.categoryId,
    },
  });
}

export function fetchProduct(
  productId: string,
  storeId: string,
  signal?: AbortSignal
): Promise<ProductDetail> {
  return apiGet<ProductDetail>(`/products/${encodeURIComponent(productId)}`, {
    signal,
    params: { storeId },
  });
}

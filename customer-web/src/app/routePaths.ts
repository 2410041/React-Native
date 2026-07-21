export const routePaths = {
  root: () => "/",
  storeCode: (storeCode: string) => `/s/${encodeURIComponent(storeCode)}`,
  storeHome: (storeId: string) => `/stores/${encodeURIComponent(storeId)}`,
  search: (storeId: string, query = "") =>
    `/stores/${encodeURIComponent(storeId)}/search${
      query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""
    }`,
  categories: (storeId: string) => `/stores/${encodeURIComponent(storeId)}/categories`,
  category: (storeId: string, categoryId: string) =>
    `/stores/${encodeURIComponent(storeId)}/categories/${encodeURIComponent(categoryId)}`,
  product: (storeId: string, productId: string) =>
    `/stores/${encodeURIComponent(storeId)}/products/${encodeURIComponent(productId)}`,
  map: (storeId: string, productId?: string) =>
    `/stores/${encodeURIComponent(storeId)}/map${
      productId ? `?productId=${encodeURIComponent(productId)}` : ""
    }`,
};

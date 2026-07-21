import { apiGet } from "@/services/apiClient";
import type { Store, StoreMap } from "@/types";

export type StoreSummary = { id: string; code: string; name: string };

export function fetchStore(storeId: string, signal?: AbortSignal): Promise<Store> {
  return apiGet<Store>(`/stores/${encodeURIComponent(storeId)}`, { signal });
}

export function listStores(signal?: AbortSignal): Promise<{ stores: StoreSummary[] }> {
  return apiGet<{ stores: StoreSummary[] }>("/stores", { signal });
}

export function resolveStoreCode(
  storeCode: string,
  signal?: AbortSignal
): Promise<{ storeId: string }> {
  return apiGet<{ storeId: string }>(`/stores/resolve/${encodeURIComponent(storeCode)}`, {
    signal,
  });
}

export function fetchStoreMap(storeId: string, signal?: AbortSignal): Promise<StoreMap> {
  return apiGet<StoreMap>(`/stores/${encodeURIComponent(storeId)}/map`, { signal });
}

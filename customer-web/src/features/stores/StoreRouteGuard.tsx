import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { ApiError } from "@/services/apiClient";
import { fetchStore } from "@/features/stores/storeApi";
import { StoreContext } from "@/features/stores/StoreContext";
import type { Store } from "@/types";

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "not-found" }
  | { status: "ready"; store: Store };

export function StoreRouteGuard() {
  const { storeId } = useParams<{ storeId: string }>();
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!storeId) {
      setState({ status: "not-found" });
      return;
    }

    const controller = new AbortController();
    setState({ status: "loading" });

    fetchStore(storeId, controller.signal)
      .then((store) => setState({ status: "ready", store }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (error instanceof ApiError && error.status === 404) {
          setState({ status: "not-found" });
          return;
        }
        setState({ status: "error" });
      });

    return () => controller.abort();
  }, [storeId, retryToken]);

  if (state.status === "loading") {
    return <LoadingState label="店舗情報を読み込んでいます…" />;
  }

  if (state.status === "not-found") {
    return (
      <EmptyState
        title="店舗が見つかりません"
        description="お手数ですが、お手元のQRコードから再度アクセスしてください。"
      />
    );
  }

  if (state.status === "error") {
    return <ErrorState onRetry={() => setRetryToken((token) => token + 1)} />;
  }

  return (
    <StoreContext.Provider value={state.store}>
      <Outlet />
    </StoreContext.Provider>
  );
}

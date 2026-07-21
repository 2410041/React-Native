import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { ApiError } from "@/services/apiClient";
import { resolveStoreCode } from "@/features/stores/storeApi";
import { routePaths } from "@/app/routePaths";

export function StoreCodeResolverPage() {
  const { storeCode } = useParams<{ storeCode: string }>();
  const [storeId, setStoreId] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!storeCode) {
      setNotFound(true);
      return;
    }
    const controller = new AbortController();
    resolveStoreCode(storeCode, controller.signal)
      .then((res) => setStoreId(res.storeId))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (error instanceof ApiError && error.status === 404) {
          setNotFound(true);
          return;
        }
        setNotFound(true);
      });
    return () => controller.abort();
  }, [storeCode]);

  if (notFound) {
    return (
      <EmptyState
        title="店舗が見つかりません"
        description="QRコードをもう一度読み取るか、店舗の従業員にご確認ください。"
      />
    );
  }

  if (storeId) {
    return <Navigate replace to={routePaths.storeHome(storeId)} />;
  }

  return <LoadingState label="店舗を確認しています…" />;
}

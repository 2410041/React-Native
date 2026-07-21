import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { listStores, type StoreSummary } from "@/features/stores/storeApi";
import { routePaths } from "@/app/routePaths";

const defaultStoreId = import.meta.env.VITE_DEFAULT_STORE_ID as string | undefined;

export function RootPage() {
  const [stores, setStores] = useState<StoreSummary[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (defaultStoreId) return;
    const controller = new AbortController();
    listStores(controller.signal)
      .then((res) => setStores(res.stores))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setHasError(true);
      });
    return () => controller.abort();
  }, []);

  if (defaultStoreId) {
    return <Navigate replace to={routePaths.storeHome(defaultStoreId)} />;
  }

  return (
    <div className="app-main" style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1 className="page-title">Urinavi</h1>
      <p className="page-subtitle">
        店舗の入口にあるQRコードを読み取ってアクセスしてください。
      </p>

      {hasError && <ErrorState title="店舗一覧を取得できませんでした" />}
      {!hasError && stores === null && <LoadingState label="店舗情報を確認しています…" />}
      {stores && stores.length > 0 && (
        <>
          <h2 className="section-title">店舗を選ぶ</h2>
          <ul className="product-list">
            {stores.map((store) => (
              <li key={store.id}>
                <Link className="product-card" to={routePaths.storeHome(store.id)}>
                  <div>
                    <div className="product-card-name">{store.name}</div>
                    <div className="product-card-category">店舗コード {store.code}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

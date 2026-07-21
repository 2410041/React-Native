import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { StatusBadge } from "@/components/StatusBadge";
import { useStore } from "@/features/stores/StoreContext";
import { fetchProduct } from "@/features/products/productApi";
import { ApiError } from "@/services/apiClient";
import { routePaths } from "@/app/routePaths";
import type { ProductDetail } from "@/types";

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "not-found" }
  | { status: "ready"; product: ProductDetail };

export function ProductDetailPage() {
  const store = useStore();
  const { productId } = useParams<{ productId: string }>();
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!productId) {
      setState({ status: "not-found" });
      return;
    }
    const controller = new AbortController();
    setState({ status: "loading" });

    fetchProduct(productId, store.id, controller.signal)
      .then((product) => setState({ status: "ready", product }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (error instanceof ApiError && error.status === 404) {
          setState({ status: "not-found" });
          return;
        }
        setState({ status: "error" });
      });

    return () => controller.abort();
  }, [productId, store.id, retryToken]);

  if (state.status === "loading") {
    return <LoadingState label="商品情報を読み込んでいます…" />;
  }

  if (state.status === "not-found") {
    return (
      <EmptyState title="商品が見つかりません" description="URLをご確認いただくか、検索からお探しください。">
        <Link className="button-secondary" to={routePaths.search(store.id)}>
          商品を検索する
        </Link>
      </EmptyState>
    );
  }

  if (state.status === "error") {
    return <ErrorState onRetry={() => setRetryToken((token) => token + 1)} />;
  }

  const { product } = state;

  return (
    <div>
      <Link className="back-link" to={routePaths.search(store.id, product.name)}>
        ← 検索結果へ戻る
      </Link>

      <div className="product-detail-card">
        <StatusBadge status={product.status} />
        <h1 className="product-detail-name">{product.name}</h1>
        <p className="product-card-category">{product.category.name}</p>

        <p className="product-detail-message">{product.status.message}</p>

        <div className="location-grid">
          <div>
            <div className="location-item-label">通路番号</div>
            <div className="location-item-value">{product.location.aisleNumber}番通路</div>
          </div>
          <div>
            <div className="location-item-label">売場名</div>
            <div className="location-item-value">{product.location.sectionName}</div>
          </div>
        </div>
        <div>
          <div className="location-item-label">目印</div>
          <div className="location-item-value">{product.location.landmark}</div>
        </div>

        {product.location.nearbyProducts.length > 0 && (
          <>
            <div className="location-item-label" style={{ marginTop: 12 }}>
              近くの商品
            </div>
            <ul className="nearby-list">
              {product.location.nearbyProducts.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </>
        )}

        <div className="state-actions" style={{ justifyContent: "flex-start", marginTop: 18 }}>
          <Link className="button-primary" to={routePaths.map(store.id, product.id)}>
            マップで確認する
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { useStore } from "@/features/stores/StoreContext";
import { fetchStoreMap } from "@/features/stores/storeApi";
import { fetchProduct } from "@/features/products/productApi";
import { StoreMapView } from "@/features/map/StoreMapView";
import type { ProductDetail, StoreMap } from "@/types";

type MapState = { status: "loading" } | { status: "error" } | { status: "ready"; map: StoreMap };

export function StoreMapPage() {
  const store = useStore();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId") ?? undefined;

  const [mapState, setMapState] = useState<MapState>({ status: "loading" });
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setMapState({ status: "loading" });

    fetchStoreMap(store.id, controller.signal)
      .then((map) => setMapState({ status: "ready", map }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setMapState({ status: "error" });
      });

    return () => controller.abort();
  }, [store.id, retryToken]);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      return;
    }
    const controller = new AbortController();
    fetchProduct(productId, store.id, controller.signal)
      .then(setProduct)
      .catch(() => setProduct(null));
    return () => controller.abort();
  }, [productId, store.id]);

  return (
    <div>
      <h1 className="page-title">店内マップ</h1>
      {product ? (
        <p className="page-subtitle">
          「{product.name}」は {product.location.aisleNumber}番通路・{product.location.sectionName}
          （{product.location.landmark}）付近です。
        </p>
      ) : (
        <p className="page-subtitle">売場全体の配置です。</p>
      )}

      {mapState.status === "loading" && <LoadingState label="マップを読み込んでいます…" />}
      {mapState.status === "error" && <ErrorState onRetry={() => setRetryToken((token) => token + 1)} />}
      {mapState.status === "ready" && (
        <>
          <div className="store-map-wrap">
            <StoreMapView map={mapState.map} highlightAisleNumber={product?.location.aisleNumber} />
          </div>
          <div className="map-legend">
            <span className="map-legend-item">
              <span className="map-legend-swatch" />
              売場
            </span>
          </div>
        </>
      )}
    </div>
  );
}

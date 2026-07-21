import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/features/stores/StoreContext";
import { fetchCategoryProducts } from "@/features/categories/categoryApi";
import { ApiError } from "@/services/apiClient";
import { routePaths } from "@/app/routePaths";
import type { Category, ProductSummary } from "@/types";

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "not-found" }
  | { status: "ready"; category: Category; products: ProductSummary[] };

export function CategoryProductsPage() {
  const store = useStore();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!categoryId) {
      setState({ status: "not-found" });
      return;
    }
    const controller = new AbortController();
    setState({ status: "loading" });

    fetchCategoryProducts(categoryId, store.id, controller.signal)
      .then((res) => setState({ status: "ready", category: res.category, products: res.products }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (error instanceof ApiError && error.status === 404) {
          setState({ status: "not-found" });
          return;
        }
        setState({ status: "error" });
      });

    return () => controller.abort();
  }, [categoryId, store.id, retryToken]);

  if (state.status === "loading") {
    return <LoadingState label="商品を読み込んでいます…" />;
  }

  if (state.status === "not-found") {
    return (
      <EmptyState title="カテゴリが見つかりません" description="カテゴリ一覧からお選びください。">
        <Link className="button-secondary" to={routePaths.categories(store.id)}>
          カテゴリ一覧へ戻る
        </Link>
      </EmptyState>
    );
  }

  if (state.status === "error") {
    return <ErrorState onRetry={() => setRetryToken((token) => token + 1)} />;
  }

  return (
    <div>
      <Link className="back-link" to={routePaths.categories(store.id)}>
        ← カテゴリ一覧
      </Link>
      <h1 className="page-title">{state.category.name}</h1>

      {state.products.length === 0 ? (
        <EmptyState
          title="このカテゴリの商品が見つかりませんでした"
          description="別のカテゴリをお試しください。"
        />
      ) : (
        <ul className="product-list">
          {state.products.map((product) => (
            <ProductCard key={product.id} storeId={store.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}

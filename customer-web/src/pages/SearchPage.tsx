import { type FormEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/features/stores/StoreContext";
import { searchProducts } from "@/features/products/productApi";
import { routePaths } from "@/app/routePaths";
import type { ProductSummary } from "@/types";

type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; products: ProductSummary[] };

export function SearchPage() {
  const store = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(query);
  const [state, setState] = useState<LoadState>({ status: "idle" });

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setState({ status: "idle" });
      return;
    }

    const controller = new AbortController();
    setState({ status: "loading" });

    searchProducts({ storeId: store.id, keyword: trimmed }, controller.signal)
      .then((res) => setState({ status: "ready", products: res.products }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ status: "error" });
      });

    return () => controller.abort();
  }, [query, store.id]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setSearchParams({ q: trimmed });
  }

  return (
    <div>
      <h1 className="page-title">商品検索</h1>

      <form className="search-form" onSubmit={handleSubmit} role="search">
        <label htmlFor="search-page-input" className="visually-hidden">
          商品名で検索
        </label>
        <input
          id="search-page-input"
          className="search-input"
          type="search"
          placeholder="商品名またはJANコード"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button className="search-button" type="submit" disabled={!inputValue.trim()}>
          検索
        </button>
      </form>

      {state.status === "idle" && (
        <EmptyState title="商品名を入力してください" description="牛乳、お茶などで検索できます。" />
      )}

      {state.status === "loading" && <LoadingState label="検索しています…" />}

      {state.status === "error" && (
        <ErrorState onRetry={() => setSearchParams({ q: query })} />
      )}

      {state.status === "ready" && state.products.length === 0 && (
        <EmptyState
          title={`「${query}」に一致する商品が見つかりませんでした`}
          description="カテゴリから探すか、お近くの従業員にご確認ください。"
        >
          <Link className="button-secondary" to={routePaths.categories(store.id)}>
            カテゴリから探す
          </Link>
        </EmptyState>
      )}

      {state.status === "ready" && state.products.length > 0 && (
        <ul className="product-list">
          {state.products.map((product) => (
            <ProductCard key={product.id} storeId={store.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}

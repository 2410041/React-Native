import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStore } from "@/features/stores/StoreContext";
import { routePaths } from "@/app/routePaths";

export function HomePage() {
  const store = useStore();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;
    navigate(routePaths.search(store.id, trimmed));
  }

  return (
    <div>
      <h1 className="page-title">{store.name}</h1>
      <p className="page-subtitle">商品名を入力して、売り場をすぐに探せます。</p>

      <form className="search-form" onSubmit={handleSubmit} role="search">
        <label htmlFor="home-search-input" className="visually-hidden">
          商品名で検索
        </label>
        <input
          id="home-search-input"
          className="search-input"
          type="search"
          placeholder="例：牛乳"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button className="search-button" type="submit" disabled={!keyword.trim()}>
          検索
        </button>
      </form>

      <div className="quick-links">
        <Link className="quick-link-card" to={routePaths.categories(store.id)}>
          <span className="quick-link-title">カテゴリから探す</span>
          <span className="quick-link-desc">商品名が分からないときに便利です</span>
        </Link>
        <Link className="quick-link-card" to={routePaths.map(store.id)}>
          <span className="quick-link-title">店内マップ</span>
          <span className="quick-link-desc">売場全体を確認できます</span>
        </Link>
      </div>

      <p className="page-subtitle" style={{ marginTop: 12 }}>
        {store.address} ／ 営業時間 {store.businessHours}
      </p>
    </div>
  );
}

import { Link } from "react-router-dom";

import { useStore } from "@/features/stores/StoreContext";
import { routePaths } from "@/app/routePaths";

export function CategoryListPage() {
  const store = useStore();

  return (
    <div>
      <h1 className="page-title">カテゴリから探す</h1>
      <p className="page-subtitle">売り場のジャンルから商品を探せます。</p>

      <ul className="category-grid" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {store.categories.map((category) => (
          <li key={category.id}>
            <Link className="category-card" to={routePaths.category(store.id, category.id)}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

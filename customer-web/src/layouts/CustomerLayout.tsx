import { useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { useStore } from "@/features/stores/StoreContext";
import { routePaths } from "@/app/routePaths";

export function CustomerLayout() {
  const store = useStore();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, [location.pathname, location.search]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        メインコンテンツへ移動
      </a>
      <header className="app-header">
        <div className="app-header-inner">
          <NavLink className="app-brand" to={routePaths.storeHome(store.id)}>
            Urinavi
          </NavLink>
          <span className="app-store-name">{store.name}</span>
        </div>
        <nav className="app-nav" aria-label="主要ナビゲーション">
          <NavLink
            className="app-nav-link"
            to={routePaths.storeHome(store.id)}
            end
          >
            ホーム
          </NavLink>
          <NavLink className="app-nav-link" to={routePaths.search(store.id)}>
            検索
          </NavLink>
          <NavLink className="app-nav-link" to={routePaths.categories(store.id)}>
            カテゴリ
          </NavLink>
          <NavLink className="app-nav-link" to={routePaths.map(store.id)}>
            店内マップ
          </NavLink>
        </nav>
      </header>
      <main
        id="main-content"
        className="app-main"
        ref={mainRef}
        tabIndex={-1}
      >
        <Outlet />
      </main>
    </div>
  );
}

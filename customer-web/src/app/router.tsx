import { createBrowserRouter } from "react-router-dom";

import { CustomerLayout } from "@/layouts/CustomerLayout";
import { StoreRouteGuard } from "@/features/stores/StoreRouteGuard";
import { RootPage } from "@/pages/RootPage";
import { StoreCodeResolverPage } from "@/pages/StoreCodeResolverPage";
import { HomePage } from "@/pages/HomePage";
import { SearchPage } from "@/pages/SearchPage";
import { CategoryListPage } from "@/pages/CategoryListPage";
import { CategoryProductsPage } from "@/pages/CategoryProductsPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { StoreMapPage } from "@/pages/StoreMapPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RouteErrorPage } from "@/pages/RouteErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <RouteErrorPage />,
  },
  {
    path: "/s/:storeCode",
    element: <StoreCodeResolverPage />,
    errorElement: <RouteErrorPage />,
  },
  {
    path: "/stores/:storeId",
    element: <StoreRouteGuard />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        element: <CustomerLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "search", element: <SearchPage /> },
          { path: "categories", element: <CategoryListPage /> },
          { path: "categories/:categoryId", element: <CategoryProductsPage /> },
          { path: "products/:productId", element: <ProductDetailPage /> },
          { path: "map", element: <StoreMapPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

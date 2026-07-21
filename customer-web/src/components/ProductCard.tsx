import { Link } from "react-router-dom";

import { StatusBadge } from "@/components/StatusBadge";
import { routePaths } from "@/app/routePaths";
import type { ProductSummary } from "@/types";

export function ProductCard({ storeId, product }: { storeId: string; product: ProductSummary }) {
  return (
    <li>
      <Link className="product-card" to={routePaths.product(storeId, product.id)}>
        <div>
          <div className="product-card-name">{product.name}</div>
          <div className="product-card-category">{product.category.name}</div>
        </div>
        <StatusBadge status={product.status} />
      </Link>
    </li>
  );
}

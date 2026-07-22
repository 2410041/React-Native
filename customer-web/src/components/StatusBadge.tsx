import type { ProductStatus } from "@/types";

const toneByCode: Record<ProductStatus["code"], "success" | "warning" | "neutral"> = {
  available: "success",
  unavailable: "neutral",
  unknown: "warning",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  const tone = toneByCode[status.code] ?? "neutral";
  return <span className={`status-badge tone-${tone}`}>{status.label ?? "状態不明"}</span>;
}

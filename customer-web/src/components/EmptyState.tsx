import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="state-block">
      <p className="state-block-title">{title}</p>
      {description && <p>{description}</p>}
      {children && <div className="state-actions">{children}</div>}
    </div>
  );
}

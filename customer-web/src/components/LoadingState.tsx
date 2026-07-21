export function LoadingState({ label = "読み込み中です…" }: { label?: string }) {
  return (
    <div className="state-block" role="status" aria-live="polite">
      <p className="state-block-title">{label}</p>
    </div>
  );
}

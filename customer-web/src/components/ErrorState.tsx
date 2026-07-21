export function ErrorState({
  title = "読み込みに失敗しました",
  description = "通信状況をご確認のうえ、もう一度お試しください。",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="state-block" role="alert">
      <p className="state-block-title">{title}</p>
      <p>{description}</p>
      {onRetry && (
        <div className="state-actions">
          <button type="button" className="button-primary" onClick={onRetry}>
            再読み込み
          </button>
        </div>
      )}
    </div>
  );
}

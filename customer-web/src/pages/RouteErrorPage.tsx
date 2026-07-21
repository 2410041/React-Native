import { Link, useRouteError } from "react-router-dom";

export function RouteErrorPage() {
  const error = useRouteError();
  if (import.meta.env.DEV) {
    console.error(error);
  }

  return (
    <div className="app-main" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div className="state-block" role="alert">
        <p className="state-block-title">エラーが発生しました</p>
        <p>お手数ですが、もう一度お試しください。</p>
        <div className="state-actions">
          <Link className="button-primary" to="/">
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

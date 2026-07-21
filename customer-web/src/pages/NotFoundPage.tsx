import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="app-main" style={{ maxWidth: 480, margin: "0 auto" }}>
      <div className="state-block">
        <p className="state-block-title">ページが見つかりません</p>
        <p>URLをご確認いただくか、店舗のQRコードから再度アクセスしてください。</p>
        <div className="state-actions">
          <Link className="button-primary" to="/">
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

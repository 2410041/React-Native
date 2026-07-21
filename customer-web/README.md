# urinavi-customer-web

Urinaviのお客さん向けWebアプリ。React + Vite + React Router（Data Router）+ PWAで構成するSPA。店舗のQRコードからアクセスし、ログイン不要で商品の売り場をすぐに検索できる。

## セットアップ

```bash
npm install
cp .env.example .env   # 必要に応じてVITE_API_BASE_URLを変更
npm run dev             # http://localhost:5173
```

APIサーバー（[`../api`](../api)）を別ターミナルで先に起動しておくこと。開発時は`vite.config.ts`のproxy設定により`/api/**`が`http://localhost:4000`へ転送される。

QRコードなしで動作確認したい場合は、`.env`に以下を設定するとトップページ（`/`）から自動的に既定店舗へリダイレクトする。

```
VITE_DEFAULT_STORE_ID=asuka
```

## ルーティング一覧

| URL | 画面 |
|---|---|
| `/` | 店舗解決画面（店舗一覧 or 既定店舗へリダイレクト） |
| `/s/:storeCode` | QR用の店舗コード解決 → `/stores/:storeId`へリダイレクト |
| `/stores/:storeId` | お客さんホーム |
| `/stores/:storeId/search?q=...` | 商品検索結果 |
| `/stores/:storeId/categories` | カテゴリ一覧 |
| `/stores/:storeId/categories/:categoryId` | カテゴリ別商品一覧 |
| `/stores/:storeId/products/:productId` | 商品詳細 |
| `/stores/:storeId/map` / `?productId=...` | 店内マップ（商品位置強調） |
| `*` | 404 |

## ビルド・Lint

```bash
npm run lint
npm run build     # tsc -b && vite build。dist/ に出力
npm run preview   # ビルド成果物をローカル確認
```

## 手動確認チェックリスト

このリポジトリには自動テストを未導入のため、変更時は以下を手動で確認する。

- [ ] ホーム → 検索 → 商品詳細 → マップ の一連の遷移でページ全体がリロードされない
- [ ] 検索フォーム送信で `?q=` 付きURLへ遷移し、ブラウザの戻る/進むで検索語と結果が復元される
- [ ] 商品詳細URL・検索URル・カテゴリURLを直接開いても同じ内容が表示される（ページを直接リロードしても404にならない）
- [ ] 存在しない店舗ID・商品ID・URLでそれぞれ適切な案内が出る
- [ ] `asuka`と`sakuradai`で商品データが混ざらない
- [ ] 375px（スマホ）、768px（タブレット）、1280px（PC）で崩れない
- [ ] `npm run build`後、`npm run preview`でPWAとしてインストール可能なこと・オフラインでも`index.html`のnavigationが機能すること

## 実行環境に関する注意

このワークスペースには Node.js / npm がインストールされていないため、このセッションでは `npm install` / `npm run dev` / `npm run build` / `npm run lint` を実行して検証できていない。ローカルでNode.js（18以降推奨）を用意したうえで、上記コマンドと手動確認チェックリストを実行すること。

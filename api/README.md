# urinavi-api

`customer-web`（お客さん向けReact SPA）向けのNode.js + Express API。将来的に`urinavi`（従業員向けExpo/React Nativeアプリ）からも同じAPIを利用する想定。

MySQL（8.4 LTS）に接続し、`stores` / `categories` / `products` を含む全ルートがDBからデータを返す。ローカルでの一括起動方法（DB込み）は[ルートのREADME](../README.md)を参照。

## セットアップ（Dockerを使わずAPI単体で動かす場合）

MySQLが別途起動していて、接続情報が分かっている前提。

```bash
cd api
npm install
DB_HOST=127.0.0.1 DB_PORT=3307 DB_NAME=urinavi_test DB_USER=urinavi DB_PASSWORD=change_me npm run db:migrate
DB_HOST=127.0.0.1 DB_PORT=3307 DB_NAME=urinavi_test DB_USER=urinavi DB_PASSWORD=change_me npm run db:seed
DB_HOST=127.0.0.1 DB_PORT=3307 DB_NAME=urinavi_test DB_USER=urinavi DB_PASSWORD=change_me npm run dev
# http://localhost:4000 で起動（ファイル変更を監視）
```

通常はルートの `docker compose up` で `db` サービスも含めて一括起動する方法を推奨する。

## 主なエンドポイント

```
GET /api/health
GET /api/stores
GET /api/stores/resolve/:storeCode
GET /api/stores/:storeId
GET /api/stores/:storeId/map
GET /api/categories
GET /api/categories/:categoryId/products?storeId=asuka
GET /api/products/search?keyword=牛乳&storeId=asuka
GET /api/products/:productId?storeId=asuka
```

店舗IDのサンプル: `asuka`（飛鳥店）, `sakuradai`（桜台店）

## DB接続

`mysql2`を使用。接続情報は環境変数（`DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` / `DB_PASSWORD`）から読み込む。コネクションプールは`src/db/pool.js`。DBへ接続できない場合、各ルートは「店舗0件」のような偽装をせず、サーバーログにエラーを出力したうえでクライアントには`{"error":"internal_error"}`（HTTP 500）を返す。`GET /api/health`はDBの死活も含めて返す。

## Migration / Seed

`database/migrations/*.sql`・`database/seeds/*.sql`（リポジトリルート）を参照。`npm run db:migrate` / `npm run db:seed` / `npm run db:setup`で再実行できる（すべて冪等）。

## CORS

`CORS_ORIGINS`環境変数（カンマ区切り）で許可オリジンを制御する。`NODE_ENV=production`以外では、スマホ実機からのLANアクセスを妨げないようプライベートIP帯（192.168.x.x / 10.x.x.x / 172.16-31.x.x）のオリジンも自動許可する。本番相当の設定ではこの自動許可は行われない。

## customer-webのビルド成果物を配信する場合

```bash
cd customer-web && npm run build
cd ../api
SERVE_CUSTOMER_WEB=true npm start
```

`customer-web/dist`を静的配信し、`/api/*`以外のGETリクエストは`index.html`へフォールバックする（History API fallback）。

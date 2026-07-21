# urinavi-api

`customer-web`（お客さん向けReact SPA）向けのNode.js + Express API。将来的に`urinavi`（従業員向けExpo/React Nativeアプリ）からも同じAPIを利用する想定。

現時点ではDBを使わず、`src/data/`配下のモックデータを返す。

## セットアップ

```bash
cd api
npm install
npm run dev   # http://localhost:4000 で起動（ファイル変更を監視）
```

## 主なエンドポイント

```
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

## customer-webのビルド成果物を配信する場合

```bash
cd customer-web && npm run build
cd ../api
SERVE_CUSTOMER_WEB=true npm start
```

`customer-web/dist`を静的配信し、`/api/*`以外のGETリクエストは`index.html`へフォールバックする（History API fallback）。

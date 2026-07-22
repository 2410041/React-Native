# Urinavi Dockerテスト環境構築 — Claude Code用プロンプト

以下を、Urinaviの最新リポジトリを開いたClaude Codeへそのまま貼り付けてください。

---

## プロンプト

あなたは既存プロジェクトを安全に改修するシニアフルスタックエンジニアです。現在開いているUrinaviリポジトリに、複数のPC（Windows・macOS）で同じ状態を再現できるDockerベースのローカルテスト環境を構築してください。

### 目的

- Docker DesktopとGitがあれば、別のPCでも短い手順でテスト環境を起動できるようにする
- 顧客向けReact SPA、Node.js／Express API、MySQLを接続する
- `GET /api/stores`の500エラーを解消し、初期店舗データを画面に表示できるようにする
- 従業員向けReact Native／Expoからも、同じAPIへ接続できるようにする
- 将来のAWS＋RDS for MySQL移行を妨げない構成にする

### Urinaviの前提

- 顧客向け：React SPA／PWA。スマホのChrome・Safariで利用する
- 従業員向け：React Native＋Expo Router＋TypeScript。Expo Goで利用する
- バックエンド：Node.js＋Express
- 中央DB：MySQL 8.4 LTSを使用する
- 複数店舗対応が前提
- 商品位置は棚番必須にせず、`通路番号＋売場名＋目印＋マップ上の位置`で管理する
- JANコードだけでなく部門コードも扱う
- 生鮮品と総菜は、初期の価格改定対象から除外する
- 複雑なタスク管理は今回追加しない
- 既存の画面、ルーティング、緑系デザインを壊さない

### 最初に必ず行う調査

1. リポジトリ全体のディレクトリ構成を確認する
2. ルートおよび各アプリの`AGENTS.md`、`CLAUDE.md`、`README.md`を読む
3. 各`package.json`、lockfile、Node.jsバージョン指定、既存のDocker関連ファイルを確認する
4. 顧客向けReact、Expo、Express APIの実際のフォルダを特定する
5. APIの起動ファイル、使用ポート、CORS、DB接続処理、`GET /api/stores`の実装を確認する
6. Prisma、Sequelize、Knex、TypeORM、`mysql2`など、既存のDB方式を確認する
7. `.env`、`.gitignore`、既存SQL／migration／seedを確認する。ただし秘密情報を出力・コミットしない
8. 現状を簡潔に報告してから実装する。フォルダ名やコマンドは、以下の例を無理に当てはめず実際の構成に合わせる

### Docker化する範囲

Docker Composeで、原則として次の3サービスを用意してください。

1. `db`
   - MySQL 8.4 LTS
   - コンテナ内ポート：`3306`
   - ホスト側ポート：環境変数で変更可能、既定値は`3307`
   - データ永続化用のnamed volumeを使用
   - `utf8mb4`を使用
   - healthcheckを設定

2. `api`
   - 既存のNode.js／Express API
   - 開発用Dockerfileを作成
   - コンテナ内では`DB_HOST=db`を使用
   - MySQLがhealthyになってから起動する
   - `0.0.0.0`でlistenし、ホストと同一LAN上のスマホからアクセス可能にする
   - ソース変更を開発サーバーが検知できる構成にする
   - `node_modules`はホストのものと混在させない
   - 既定ポートは`3000`

3. `customer-web`
   - 顧客向けReact SPAがリポジトリに存在する場合のみ対象にする
   - Viteなら`0.0.0.0`で起動し、既定ポートは`5173`
   - `/api`を`api`サービスへプロキシするか、既存のAPI URL方式に整合させる
   - スマホから`http://PCのLAN内IP:5173`で表示できるようにする
   - 顧客向けプロジェクトが存在しなければ、勝手に別アプリを新規生成せず、その事実を報告してDB＋APIだけ構築する

従業員向けExpoは、QRコード・LAN接続・Fast Refreshを安定させるため、今回はDockerコンテナに入れずホストPC上で起動します。ExpoアプリからAPIへ接続する際は、スマホ実機で`localhost`を使わないでください。開発用API URLを環境変数へ切り出し、例として`EXPO_PUBLIC_API_URL=http://192.168.x.x:3000`を使えるようにしてください。既存の環境変数方式がある場合はそれを維持します。

### 作成・更新するファイル

実際の構成に合わせ、必要なものだけを作成・更新してください。

```text
docker-compose.yml
.env.example
.gitignore
README.md
backend/Dockerfile.dev              # 実際のAPIフォルダに配置
backend/.dockerignore
customer-web/Dockerfile.dev         # 顧客向けReactが存在する場合
customer-web/.dockerignore
database/migrations/*.sql           # 既存方式がなければ作成
database/seeds/*.sql                # テスト用データ
```

Composeファイルでは、パスワード等を直書きせず`.env`から受け取ってください。`.env`はコミット対象外、`.env.example`はダミー値のみとします。Composeのトップレベル`version`は不要です。

### DB実装方針

- 既存のmigrationツールがある場合は、その方式を最優先して維持する
- 既存方式がない場合は、再実行を考慮したSQL migrationとseedの仕組みを用意する
- MySQLの`docker-entrypoint-initdb.d`は空のvolumeでしか自動実行されない点をREADMEに明記する
- テーブル名・カラム名がすでに使われている場合は、既存APIとの互換性を優先する
- 外部キー、必要なindex、unique制約を設定する
- 日時はMySQL側で管理し、更新日時が正しく更新されるようにする
- 日本語の商品名・店舗名を保存できるよう、DB・接続とも`utf8mb4`にする

既存スキーマが未作成の場合のみ、MVPとして最低限次を設計してください。

- `stores`：店舗、店舗コード、店舗名、住所、状態、作成・更新日時
- `categories`：カテゴリ、親カテゴリ
- `departments`：部門コード、部門名、価格改定対象かどうか
- `products`：JANコード、商品名、かな、カテゴリ、部門、画像URL
- `aisles`：店舗、通路番号、通路名、マップ領域
- `product_locations`：店舗別の商品位置、売場名、コーナー名、目印、マップ領域、売場表示状態

要件：

- `stores.store_code`は一意にする
- `products.jan_code`は文字列として保持し、先頭の0を失わない
- 店舗と商品の組み合わせで売場情報を管理できるようにする
- 通路番号がない生鮮・ドラッグ等も登録できるよう、`aisle_id`はnullableにする
- 在庫数は今回実装しない
- `売場にある`は正確な在庫保証ではないため、既存UIの意味を変えない
- 生鮮・総菜に該当する部門は`is_price_revision_target=false`の初期データにする

### テスト用seed

少なくとも以下を含む、画面確認用の小さなseedデータを作成してください。

- テスト店舗1件（分かりやすい店舗コード付き）
- カテゴリ数件
- 部門数件（食品、日配、ドラッグ・雑貨、生鮮、総菜など）
- 商品5〜10件
- JANコード、部門コード、通路番号、売場名、目印を確認できる商品位置
- 通路番号を持たない商品の例

実在企業の秘密情報や実在商品の価格・在庫は入れず、明確にテストデータと分かる内容にしてください。

### APIの修正

- 現在の`GET /api/stores`が500になる根本原因をコードとログから特定する
- DB未接続を店舗0件と誤魔化さず、サーバーログには原因を残す
- クライアントへは秘密情報を含まない統一JSONエラーを返す
- `GET /health`または`GET /api/health`を追加し、APIとDBの状態を確認できるようにする
- `GET /api/stores`がseed店舗を返すようにする
- 既存APIがあれば重複ルートを作らず修正する
- SQLは必ずプレースホルダーを使う
- DBコネクションプールとgraceful shutdownを適切に扱う
- CORSは開発元を環境変数で制御し、無条件の全許可を本番設定に持ち込まない

### 環境変数

既存命名を優先しつつ、足りなければ次を用意してください。

```env
COMPOSE_PROJECT_NAME=urinavi
MYSQL_DATABASE=urinavi_test
MYSQL_USER=urinavi
MYSQL_PASSWORD=change_me
MYSQL_ROOT_PASSWORD=change_root_me
MYSQL_HOST_PORT=3307
API_PORT=3000
CUSTOMER_WEB_PORT=5173
DB_HOST=db
DB_PORT=3306
DB_NAME=urinavi_test
DB_USER=urinavi
DB_PASSWORD=change_me
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173
VITE_API_BASE_URL=/api
EXPO_PUBLIC_API_URL=http://192.168.x.x:3000
```

変数がフロントへ公開されるかどうかを区別し、DBパスワードを`VITE_`または`EXPO_PUBLIC_`で始まる変数へ絶対に入れないでください。

### 開発者向けコマンド

ルートから最低限、次の操作ができるようにしてください。既存package managerに合わせ、必要ならルートのnpm scriptsまたはMakefile相当を追加して構いませんが、新しい道具を増やしすぎないでください。

```bash
docker compose config
docker compose up --build -d
docker compose ps
docker compose logs -f api
docker compose down
```

DBを消して完全に初期化する操作はデータ削除を伴うため、通常の停止手順と分けてREADMEへ警告付きで記載してください。

### READMEに必ず書く内容

- 前提：Docker Desktop、Git、Expo確認時のみNode.js/npmとExpo Go
- 初回起動手順：`.env.example`から`.env`を作る→Compose起動
- Windows PowerShellとmacOS/Linuxの`.env`コピーコマンド
- 起動確認URL
- 顧客向け画面をスマホで開く方法
- PCのLAN内IPの調べ方（Windowsは`ipconfig`、macOSはネットワーク設定等）
- Expo用`EXPO_PUBLIC_API_URL`の設定例
- migration／seedの実行方法
- ログの確認方法
- 停止方法
- volumeを維持する通常停止と、DBを削除する完全初期化の違い
- `localhost`がスマホ自身を指すため、実機ではPCのIPを使うこと
- 学校・自宅等でネットワークが変わるたび、PCのIPが変わる可能性
- Windows Firewall等で3000／5173番へのLANアクセスが遮断される場合があること
- 秘密情報をGitHubへpushしないこと

### 実装時の禁止事項

- 既存画面や既存ルートを大規模に作り直さない
- Expoアプリ全体をDocker化しない
- `.env`や実パスワードをコミットしない
- `node_modules`、DB volume、ビルド成果物をコミットしない
- DB接続失敗時にモックへ黙って切り替えない
- 本番用AWS環境を今回作成しない
- ロリポップ向けの構成を今回追加しない
- 既存のpackage managerやDBライブラリを、理由なく別のものへ変更しない
- ユーザーの既存変更を削除・上書きしない
- 不明点を推測だけで決めず、コードから判断できない重大事項だけ質問する

### 検証

実装後、可能な範囲で実際に次を実行してください。

1. `docker compose config`が成功する
2. `docker compose up --build -d`で必要サービスが起動する
3. `docker compose ps`でMySQLがhealthyになる
4. API health endpointが成功する
5. `GET /api/stores`がHTTP 200でテスト店舗を返す
6. 顧客向けReactがある場合、店舗一覧を取得して画面が表示される
7. APIのlint・test・型チェックを実行する
8. 顧客向けReactのlint・test・buildを実行する
9. Expoアプリのlint・TypeScriptチェックを実行する
10. 秘密情報、`.env`、DBデータがGit管理対象になっていないことを確認する

テストコマンドが元から存在しない場合は、存在しないものを成功したように報告せず、その旨を明記してください。Dockerを実行できない環境の場合も、作成した設定の静的検証まで行い、未実行項目を明確にしてください。

### 完了時の報告形式

最後に日本語で、次の順に簡潔に報告してください。

1. 調査で判明した実際の構成
2. 500エラーの根本原因
3. 追加・変更したファイル一覧
4. 各Dockerサービスの役割と公開ポート
5. 実行した検証と結果
6. 起動コマンド
7. PCブラウザ・スマホブラウザ・Expo Goそれぞれの確認URL／設定
8. 未解決事項または手動で必要な作業

まずリポジトリを調査し、既存構成に合わせた短い実装計画を示してから、確認待ちで止まらず安全な範囲で実装を進めてください。

---

## 想定される起動後の構成

| 対象 | 起動場所 | 確認方法 |
|---|---|---|
| MySQL | Docker | ホストの`127.0.0.1:3307`、コンテナ間は`db:3306` |
| Node.js API | Docker | `http://localhost:3000`または`http://PCのIP:3000` |
| 顧客向けReact | Docker | `http://localhost:5173`または`http://PCのIP:5173` |
| 従業員向けExpo | PC上 | Expo Go。API URLは`http://PCのIP:3000` |


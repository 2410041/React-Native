-- Urinavi テスト用 seed データ
-- 既存の api/src/data/*.js モックの内容をそのまま移植し、画面の見た目・挙動を変えない。
-- 再実行可能: すべて ON DUPLICATE KEY UPDATE / INSERT ... SELECT ... ON DUPLICATE KEY UPDATE を使用する。
-- 実在企業の情報・実在商品の価格や在庫は含まない、明確なテストデータ。

SET NAMES utf8mb4;

-- ------------------------------------------------------------
-- stores（テスト店舗2件。store_code は分かりやすい4桁コード）
-- ------------------------------------------------------------
INSERT INTO stores (id, store_code, name, address, business_hours, status, entrance_x, entrance_y)
VALUES
  ('asuka', '0012', '飛鳥店', '大阪府高槻市飛鳥町1-2-3', '9:00〜22:00（年中無休）', 'active', 50, 96),
  ('sakuradai', '0027', '桜台店', '大阪府茨木市桜台4-5-6', '9:30〜21:30（年中無休）', 'active', 50, 96)
ON DUPLICATE KEY UPDATE
  store_code = VALUES(store_code),
  name = VALUES(name),
  address = VALUES(address),
  business_hours = VALUES(business_hours),
  status = VALUES(status),
  entrance_x = VALUES(entrance_x),
  entrance_y = VALUES(entrance_y);

-- ------------------------------------------------------------
-- categories（既存モックの表示順を sort_order で維持）
-- ------------------------------------------------------------
INSERT INTO categories (id, name, parent_id, sort_order)
VALUES
  ('drug', 'ドラッグ・雑貨', NULL, 1),
  ('daily', '日配', NULL, 2),
  ('grocery', '食品', NULL, 3),
  ('beverage', '飲料', NULL, 4),
  ('snack', '菓子', NULL, 5),
  ('fresh', '生鮮', NULL, 6),
  ('deli', '惣菜', NULL, 7)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  parent_id = VALUES(parent_id),
  sort_order = VALUES(sort_order);

-- ------------------------------------------------------------
-- departments（部門コード。生鮮・総菜は価格改定対象外）
-- ------------------------------------------------------------
INSERT INTO departments (code, name, is_price_revision_target)
VALUES
  ('D01', '食品', TRUE),
  ('D02', '日配', TRUE),
  ('D03', 'ドラッグ・雑貨', TRUE),
  ('D04', '生鮮', FALSE),
  ('D05', '総菜', FALSE)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  is_price_revision_target = VALUES(is_price_revision_target);

-- ------------------------------------------------------------
-- aisles（店舗別の通路。マップ座標は既存モックの店内マップ表示をそのまま再現）
-- ------------------------------------------------------------
INSERT INTO aisles (store_id, aisle_number, aisle_name, category_id, map_area_id, map_x, map_y, map_width, map_height)
VALUES
  ('asuka', '1', '青果', 'fresh', NULL, 6, 66, 12, 26),
  ('asuka', '2', '調味料', 'grocery', NULL, 22, 66, 12, 26),
  ('asuka', '4', '菓子', 'snack', NULL, 38, 66, 12, 26),
  ('asuka', '6', '飲料', 'beverage', NULL, 54, 66, 12, 26),
  ('asuka', '8', '日配', 'daily', NULL, 70, 40, 12, 26),
  ('asuka', '9', '惣菜', 'deli', NULL, 70, 66, 12, 26),
  ('asuka', '10', 'ドラッグ・雑貨', 'drug', NULL, 86, 40, 12, 52),
  ('sakuradai', '1', '青果', 'fresh', NULL, 6, 66, 14, 26),
  ('sakuradai', '2', '食品', 'grocery', NULL, 24, 66, 14, 26),
  ('sakuradai', '3', '菓子', 'snack', NULL, 42, 66, 14, 26),
  ('sakuradai', '5', '飲料', 'beverage', NULL, 60, 66, 14, 26),
  ('sakuradai', '7', '日配', 'daily', NULL, 78, 40, 16, 26),
  ('sakuradai', '9', 'ドラッグ・雑貨', 'drug', NULL, 78, 68, 16, 24)
ON DUPLICATE KEY UPDATE
  aisle_name = VALUES(aisle_name),
  category_id = VALUES(category_id),
  map_area_id = VALUES(map_area_id),
  map_x = VALUES(map_x),
  map_y = VALUES(map_y),
  map_width = VALUES(map_width),
  map_height = VALUES(map_height);

-- ------------------------------------------------------------
-- products（店舗をまたぐ商品マスタ。JANコードで一意）
-- 17件目は「通路番号を持たない商品」の確認用に追加した生鮮商品。
-- ------------------------------------------------------------
INSERT INTO products (jan_code, name, category_id, department_code)
VALUES
  ('4902102112621', 'コカ・コーラ 500ml', 'beverage', 'D01'),
  ('4909411084904', '午後の紅茶 ミルクティー', 'beverage', 'D01'),
  ('4901330504250', 'ポテトチップス うすしお', 'snack', 'D01'),
  ('4901330512637', 'ポテトチップス コンソメパンチ', 'snack', 'D01'),
  ('4901005202748', 'キッコーマン しょうゆ 1L', 'grocery', 'D01'),
  ('4901005203097', 'マンジョウ 本みりん 500ml', 'grocery', 'D01'),
  ('4902220770199', '明治ブルガリアヨーグルト', 'daily', 'D02'),
  ('4902102072994', '森永 牛乳 1000ml', 'daily', 'D02'),
  ('4987176045213', 'サラサラヘアシャンプー', 'drug', 'D03'),
  ('4901301234814', 'キッチン用洗剤 詰替', 'drug', 'D03'),
  ('4901005605521', 'アボカド 1玉', 'fresh', 'D04'),
  ('4901005605538', '国産バナナ 1房', 'fresh', 'D04'),
  ('4901005605545', '彩り野菜の煮物 惣菜パック', 'deli', 'D05'),
  ('4901005605552', '若鶏のから揚げ', 'deli', 'D05'),
  ('4901005605569', '十六茶 630ml', 'beverage', 'D01'),
  ('4901005605576', 'い・ろ・は・す 天然水 555ml', 'beverage', 'D01'),
  ('4901005605583', '朝どれいちごパック', 'fresh', 'D04')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  category_id = VALUES(category_id),
  department_code = VALUES(department_code);

-- ------------------------------------------------------------
-- product_locations（asuka: 17件、うち1件は通路番号なし / sakuradai: 2件）
-- 既存モックの handlingStatus・updatedAt相当の状態文字列をそのまま保持する。
-- ------------------------------------------------------------
INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '飲料', '冷ケース横', TRUE, '取扱いあり', JSON_ARRAY('午後の紅茶 ミルクティー', 'い・ろ・は・す 天然水 555ml')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '6'
WHERE p.jan_code = '4902102112621'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '飲料', '常温飲料棚 中段', TRUE, '取扱いあり', JSON_ARRAY('コカ・コーラ 500ml', '十六茶 630ml')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '6'
WHERE p.jan_code = '4909411084904'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '菓子', 'スナック菓子棚', TRUE, '取扱いあり', JSON_ARRAY('ポテトチップス コンソメパンチ', '柿の種')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '4'
WHERE p.jan_code = '4901330504250'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '菓子', 'スナック菓子棚 上段', TRUE, '取扱いあり', JSON_ARRAY('ポテトチップス うすしお')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '4'
WHERE p.jan_code = '4901330512637'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '調味料', '醤油・みりんの近く', TRUE, '取扱いあり', JSON_ARRAY('マンジョウ 本みりん 500ml', '米酢 500ml')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '2'
WHERE p.jan_code = '4901005202748'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '調味料', '醤油の右隣', FALSE, '一時休止', JSON_ARRAY('キッコーマン しょうゆ 1L')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '2'
WHERE p.jan_code = '4901005203097'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '日配', '乳製品ケース上段', TRUE, '取扱いあり', JSON_ARRAY('森永 牛乳 1000ml')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '8'
WHERE p.jan_code = '4902220770199'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '日配', '乳製品ケース下段', TRUE, '取扱いあり', JSON_ARRAY('明治ブルガリアヨーグルト')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '8'
WHERE p.jan_code = '4902102072994'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, 'ドラッグ・雑貨', 'ヘアケア棚', TRUE, '取扱いあり', JSON_ARRAY('キッチン用洗剤 詰替')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '10'
WHERE p.jan_code = '4987176045213'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, 'ドラッグ・雑貨', '台所用品棚', FALSE, '不明', JSON_ARRAY('サラサラヘアシャンプー')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '10'
WHERE p.jan_code = '4901301234814'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '青果', '入口正面の平台', TRUE, '取扱いあり', JSON_ARRAY('国産バナナ 1房')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '1'
WHERE p.jan_code = '4901005605521'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '青果', 'アボカドの隣', TRUE, '取扱いあり', JSON_ARRAY('アボカド 1玉')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '1'
WHERE p.jan_code = '4901005605538'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '惣菜', 'レジ横惣菜ケース', TRUE, '取扱いあり', JSON_ARRAY('若鶏のから揚げ')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '9'
WHERE p.jan_code = '4901005605545'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '惣菜', '温蔵ケース手前', TRUE, '取扱いあり', JSON_ARRAY('彩り野菜の煮物 惣菜パック')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '9'
WHERE p.jan_code = '4901005605552'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '飲料', '常温飲料棚 下段', FALSE, '取扱いなし', JSON_ARRAY('午後の紅茶 ミルクティー')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '6'
WHERE p.jan_code = '4901005605569'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'asuka', a.id, '飲料', '冷ケース入口側', TRUE, '取扱いあり', JSON_ARRAY('コカ・コーラ 500ml')
FROM products p JOIN aisles a ON a.store_id = 'asuka' AND a.aisle_number = '6'
WHERE p.jan_code = '4901005605576'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

-- 通路番号を持たない商品の例（生鮮のため、天井の通路番号表示がない想定）
INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products, note)
SELECT p.id, 'asuka', NULL, '青果コーナー', '入口横の特設コーナー', TRUE, '取扱いあり', JSON_ARRAY(), '通路番号なし（生鮮のため天井表示がない）'
FROM products p
WHERE p.jan_code = '4901005605583'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products), note = VALUES(note);

-- sakuradai（コカ・コーラ / ポテトチップス うすしお のみ、既存モックどおり）
INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'sakuradai', a.id, '飲料', '冷ケース横', TRUE, '取扱いあり', JSON_ARRAY('午後の紅茶 ミルクティー')
FROM products p JOIN aisles a ON a.store_id = 'sakuradai' AND a.aisle_number = '5'
WHERE p.jan_code = '4902102112621'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

INSERT INTO product_locations (product_id, store_id, aisle_id, area_name, landmark, is_available_on_shelf, handling_status, nearby_products)
SELECT p.id, 'sakuradai', a.id, '菓子', 'スナック菓子棚', FALSE, '不明', JSON_ARRAY()
FROM products p JOIN aisles a ON a.store_id = 'sakuradai' AND a.aisle_number = '3'
WHERE p.jan_code = '4901330504250'
ON DUPLICATE KEY UPDATE aisle_id = VALUES(aisle_id), area_name = VALUES(area_name), landmark = VALUES(landmark), is_available_on_shelf = VALUES(is_available_on_shelf), handling_status = VALUES(handling_status), nearby_products = VALUES(nearby_products);

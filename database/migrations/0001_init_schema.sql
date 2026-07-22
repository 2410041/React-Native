-- Urinavi MVP schema
-- 再実行可能: すべて CREATE TABLE IF NOT EXISTS を使用する。
-- 文字コード: 日本語の店舗名・商品名を保存するため utf8mb4 / utf8mb4_unicode_ci で統一する。

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS stores (
  id              VARCHAR(50)  NOT NULL,
  store_code      VARCHAR(20)  NOT NULL,
  name            VARCHAR(100) NOT NULL,
  address         VARCHAR(255) NULL,
  business_hours  VARCHAR(100) NULL,
  status          ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  entrance_x      DECIMAL(6,2) NULL,
  entrance_y      DECIMAL(6,2) NULL,
  created_at      DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at      DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_stores_store_code (store_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS categories (
  id          VARCHAR(50)  NOT NULL,
  name        VARCHAR(100) NOT NULL,
  parent_id   VARCHAR(50)  NULL,
  sort_order  SMALLINT     NOT NULL DEFAULT 0,
  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  KEY idx_categories_parent_id (parent_id),
  CONSTRAINT fk_categories_parent
    FOREIGN KEY (parent_id) REFERENCES categories(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS departments (
  code                      VARCHAR(20)  NOT NULL,
  name                      VARCHAR(100) NOT NULL,
  is_price_revision_target  BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  jan_code         VARCHAR(20)  NOT NULL COMMENT '先頭0を保持するため文字列で保存',
  name             VARCHAR(255) NOT NULL,
  kana             VARCHAR(255) NULL,
  category_id      VARCHAR(50)  NULL,
  department_code  VARCHAR(20)  NULL,
  image_url        VARCHAR(255) NULL,
  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_jan_code (jan_code),
  KEY idx_products_category_id (category_id),
  KEY idx_products_department_code (department_code),
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_products_department
    FOREIGN KEY (department_code) REFERENCES departments(code)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 通路。マップ描画用の座標(map_x/y/width/height)も保持し、店内マップ画面をDBから再現できるようにする。
CREATE TABLE IF NOT EXISTS aisles (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  store_id      VARCHAR(50)  NOT NULL,
  aisle_number  VARCHAR(20)  NOT NULL,
  aisle_name    VARCHAR(100) NULL,
  category_id   VARCHAR(50)  NULL,
  map_area_id   VARCHAR(50)  NULL,
  map_x         DECIMAL(6,2) NULL,
  map_y         DECIMAL(6,2) NULL,
  map_width     DECIMAL(6,2) NULL,
  map_height    DECIMAL(6,2) NULL,
  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_aisles_store_aisle_number (store_id, aisle_number),
  KEY idx_aisles_category_id (category_id),
  CONSTRAINT fk_aisles_store
    FOREIGN KEY (store_id) REFERENCES stores(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_aisles_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 店舗別の商品位置。生鮮・ドラッグ等、通路番号を持たない商品もあるため aisle_id は NULL 許容。
-- 在庫数は持たず、is_available_on_shelf / handling_status はあくまで「売り場にある/ない」の目安。
CREATE TABLE IF NOT EXISTS product_locations (
  id                      BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id              BIGINT UNSIGNED NOT NULL,
  store_id                VARCHAR(50)  NOT NULL,
  aisle_id                BIGINT UNSIGNED NULL,
  area_name               VARCHAR(100) NULL,
  corner_name             VARCHAR(100) NULL,
  landmark                VARCHAR(255) NULL,
  map_area_id             VARCHAR(50)  NULL,
  is_available_on_shelf   BOOLEAN NOT NULL DEFAULT TRUE,
  handling_status         VARCHAR(20) NOT NULL DEFAULT '不明',
  nearby_products         JSON NULL,
  note                    TEXT NULL,
  created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_product_locations_product_store (product_id, store_id),
  KEY idx_product_locations_store_id (store_id),
  KEY idx_product_locations_aisle_id (aisle_id),
  CONSTRAINT fk_product_locations_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_product_locations_store
    FOREIGN KEY (store_id) REFERENCES stores(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_product_locations_aisle
    FOREIGN KEY (aisle_id) REFERENCES aisles(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

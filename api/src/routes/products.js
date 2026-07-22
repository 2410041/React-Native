const express = require("express");
const { pool } = require("../db/pool");
const { getProductDisplayStatus } = require("../data/productStatus");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

async function loadCategoriesByIds(ids) {
	const uniqueIds = [...new Set(ids)].filter(Boolean);
	if (uniqueIds.length === 0) {
		return new Map();
	}
	const [rows] = await pool.query("SELECT id, name FROM categories WHERE id IN (?)", [uniqueIds]);
	return new Map(rows.map((r) => [r.id, { id: r.id, name: r.name }]));
}

function parseNearbyProducts(value) {
	if (Array.isArray(value)) return value;
	if (typeof value === "string") {
		try {
			return JSON.parse(value);
		} catch {
			return [];
		}
	}
	return [];
}

router.get(
	"/search",
	asyncHandler(async (req, res) => {
		const { keyword = "", storeId, categoryId } = req.query;
		if (!storeId) {
			return res.status(400).json({ error: "store_id_required" });
		}
		const [storeRows] = await pool.query("SELECT id FROM stores WHERE id = ? AND status = 'active' LIMIT 1", [
			storeId,
		]);
		if (storeRows.length === 0) {
			return res.status(404).json({ error: "store_not_found" });
		}

		const trimmedKeyword = String(keyword).trim();
		const conditions = ["pl.store_id = ?"];
		const params = [storeId];

		if (categoryId && categoryId !== "all") {
			conditions.push("p.category_id = ?");
			params.push(String(categoryId));
		}
		if (trimmedKeyword) {
			if (/^\d+$/.test(trimmedKeyword)) {
				conditions.push("p.jan_code LIKE ?");
				params.push(`%${trimmedKeyword}%`);
			} else {
				conditions.push("p.name LIKE ?");
				params.push(`%${trimmedKeyword}%`);
			}
		}

		const [rows] = await pool.query(
			`SELECT p.id, p.name, p.jan_code AS janCode, p.category_id AS categoryId, pl.handling_status AS handlingStatus
			 FROM product_locations pl
			 JOIN products p ON p.id = pl.product_id
			 WHERE ${conditions.join(" AND ")}
			 ORDER BY p.id`,
			params
		);

		const categories = await loadCategoriesByIds(rows.map((r) => r.categoryId));

		return res.json({
			keyword: String(keyword),
			products: rows.map((r) => ({
				id: String(r.id),
				name: r.name,
				janCode: r.janCode,
				category: categories.get(r.categoryId) ?? null,
				status: getProductDisplayStatus(r.handlingStatus),
			})),
		});
	})
);

router.get(
	"/:productId",
	asyncHandler(async (req, res) => {
		const { storeId } = req.query;
		const productId = Number(req.params.productId);
		if (!Number.isInteger(productId)) {
			return res.status(404).json({ error: "product_not_found" });
		}

		const conditions = ["p.id = ?"];
		const params = [productId];
		if (storeId) {
			conditions.push("pl.store_id = ?");
			params.push(String(storeId));
		}

		const [rows] = await pool.query(
			`SELECT p.id, p.jan_code AS janCode, p.name, p.category_id AS categoryId,
			        pl.store_id AS storeId, a.aisle_number AS aisleNumber,
			        pl.area_name AS sectionName, pl.landmark, pl.nearby_products AS nearbyProducts,
			        pl.handling_status AS handlingStatus, pl.updated_at AS updatedAt
			 FROM product_locations pl
			 JOIN products p ON p.id = pl.product_id
			 LEFT JOIN aisles a ON a.id = pl.aisle_id
			 WHERE ${conditions.join(" AND ")}
			 LIMIT 1`,
			params
		);

		if (rows.length === 0) {
			return res.status(404).json({ error: "product_not_found" });
		}
		const row = rows[0];
		const [categoryRows] = await pool.query("SELECT id, name FROM categories WHERE id = ? LIMIT 1", [
			row.categoryId,
		]);

		return res.json({
			id: String(row.id),
			storeId: row.storeId,
			janCode: row.janCode,
			name: row.name,
			category: categoryRows[0] ?? null,
			location: {
				aisleNumber: row.aisleNumber !== null ? Number(row.aisleNumber) : null,
				sectionName: row.sectionName,
				landmark: row.landmark,
				nearbyProducts: parseNearbyProducts(row.nearbyProducts),
			},
			status: getProductDisplayStatus(row.handlingStatus),
			updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : row.updatedAt,
		});
	})
);

module.exports = router;

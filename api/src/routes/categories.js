const express = require("express");
const { pool } = require("../db/pool");
const { getProductDisplayStatus } = require("../data/productStatus");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const [rows] = await pool.query("SELECT id, name FROM categories ORDER BY sort_order");
		return res.json({ categories: rows });
	})
);

router.get(
	"/:categoryId/products",
	asyncHandler(async (req, res) => {
		const { storeId } = req.query;

		const [categoryRows] = await pool.query("SELECT id, name FROM categories WHERE id = ? LIMIT 1", [
			req.params.categoryId,
		]);
		if (categoryRows.length === 0) {
			return res.status(404).json({ error: "category_not_found" });
		}
		if (!storeId) {
			return res.status(400).json({ error: "store_id_required" });
		}
		const [storeRows] = await pool.query("SELECT id FROM stores WHERE id = ? AND status = 'active' LIMIT 1", [
			storeId,
		]);
		if (storeRows.length === 0) {
			return res.status(404).json({ error: "store_not_found" });
		}

		const [productRows] = await pool.query(
			`SELECT p.id, p.name, p.category_id AS categoryId, pl.handling_status AS handlingStatus
			 FROM product_locations pl
			 JOIN products p ON p.id = pl.product_id
			 WHERE pl.store_id = ? AND p.category_id = ?
			 ORDER BY p.id`,
			[storeId, req.params.categoryId]
		);

		const products = productRows.map((p) => ({
			id: String(p.id),
			name: p.name,
			categoryId: p.categoryId,
			status: getProductDisplayStatus(p.handlingStatus),
		}));

		return res.json({ category: categoryRows[0], products });
	})
);

module.exports = router;

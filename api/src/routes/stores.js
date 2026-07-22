const express = require("express");
const { pool } = require("../db/pool");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

async function getStoreCategories(storeId) {
	const [rows] = await pool.query(
		`SELECT DISTINCT c.id, c.name, c.sort_order
		 FROM aisles a
		 JOIN categories c ON c.id = a.category_id
		 WHERE a.store_id = ?
		 ORDER BY c.sort_order`,
		[storeId]
	);
	return rows.map((r) => ({ id: r.id, name: r.name }));
}

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const [rows] = await pool.query(
			"SELECT id, store_code AS code, name FROM stores WHERE status = 'active' ORDER BY id"
		);
		return res.json({ stores: rows });
	})
);

router.get(
	"/resolve/:storeCode",
	asyncHandler(async (req, res) => {
		const [rows] = await pool.query(
			"SELECT id FROM stores WHERE store_code = ? AND status = 'active' LIMIT 1",
			[req.params.storeCode]
		);
		if (rows.length === 0) {
			return res.status(404).json({ error: "store_not_found" });
		}
		return res.json({ storeId: rows[0].id });
	})
);

router.get(
	"/:storeId/map",
	asyncHandler(async (req, res) => {
		const [storeRows] = await pool.query(
			"SELECT id, entrance_x, entrance_y FROM stores WHERE id = ? AND status = 'active' LIMIT 1",
			[req.params.storeId]
		);
		if (storeRows.length === 0) {
			return res.status(404).json({ error: "store_not_found" });
		}
		const store = storeRows[0];

		const [aisleRows] = await pool.query(
			`SELECT aisle_number, aisle_name, category_id, map_x, map_y, map_width, map_height
			 FROM aisles WHERE store_id = ? ORDER BY CAST(aisle_number AS UNSIGNED)`,
			[req.params.storeId]
		);

		return res.json({
			storeId: store.id,
			entrance: { x: Number(store.entrance_x), y: Number(store.entrance_y) },
			aisles: aisleRows.map((a) => ({
				aisleNumber: Number(a.aisle_number),
				sectionName: a.aisle_name,
				categoryId: a.category_id,
				x: Number(a.map_x),
				y: Number(a.map_y),
				width: Number(a.map_width),
				height: Number(a.map_height),
			})),
		});
	})
);

router.get(
	"/:storeId",
	asyncHandler(async (req, res) => {
		const [rows] = await pool.query(
			"SELECT id, store_code AS code, name, address, business_hours FROM stores WHERE id = ? AND status = 'active' LIMIT 1",
			[req.params.storeId]
		);
		if (rows.length === 0) {
			return res.status(404).json({ error: "store_not_found" });
		}
		const store = rows[0];
		const categories = await getStoreCategories(store.id);
		return res.json({
			id: store.id,
			code: store.code,
			name: store.name,
			address: store.address,
			businessHours: store.business_hours,
			categories,
		});
	})
);

module.exports = router;

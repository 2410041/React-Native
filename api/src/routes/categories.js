const express = require("express");
const { categories, getCategoryById } = require("../data/categories");
const { getStoreById } = require("../data/stores");
const { getProductsByCategory } = require("../data/products");
const { getProductDisplayStatus } = require("../data/productStatus");

const router = express.Router();

router.get("/", (req, res) => {
	return res.json({ categories });
});

router.get("/:categoryId/products", (req, res) => {
	const { storeId } = req.query;
	const category = getCategoryById(req.params.categoryId);
	if (!category) {
		return res.status(404).json({ error: "category_not_found" });
	}
	if (!storeId) {
		return res.status(400).json({ error: "store_id_required" });
	}
	const store = getStoreById(storeId);
	if (!store) {
		return res.status(404).json({ error: "store_not_found" });
	}
	const products = getProductsByCategory(storeId, req.params.categoryId).map((p) => ({
		id: p.id,
		name: p.name,
		categoryId: p.categoryId,
		status: getProductDisplayStatus(p.handlingStatus),
	}));
	return res.json({ category, products });
});

module.exports = router;

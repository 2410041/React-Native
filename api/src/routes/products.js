const express = require("express");
const { getProductById, searchProducts } = require("../data/products");
const { getStoreById } = require("../data/stores");
const { getCategoryById } = require("../data/categories");
const { getProductDisplayStatus } = require("../data/productStatus");

const router = express.Router();

function serializeProduct(p) {
	return {
		id: p.id,
		storeId: p.storeId,
		janCode: p.janCode,
		name: p.name,
		category: getCategoryById(p.categoryId),
		location: p.location,
		status: getProductDisplayStatus(p.handlingStatus),
		updatedAt: p.updatedAt,
	};
}

router.get("/search", (req, res) => {
	const { keyword = "", storeId, categoryId } = req.query;
	if (!storeId) {
		return res.status(400).json({ error: "store_id_required" });
	}
	const store = getStoreById(storeId);
	if (!store) {
		return res.status(404).json({ error: "store_not_found" });
	}
	const results = searchProducts({ keyword: String(keyword), storeId: String(storeId), categoryId: categoryId ? String(categoryId) : undefined });
	return res.json({
		keyword: String(keyword),
		products: results.map((p) => ({
			id: p.id,
			name: p.name,
			janCode: p.janCode,
			category: getCategoryById(p.categoryId),
			status: getProductDisplayStatus(p.handlingStatus),
		})),
	});
});

router.get("/:productId", (req, res) => {
	const { storeId } = req.query;
	const product = getProductById(req.params.productId);
	if (!product || (storeId && product.storeId !== storeId)) {
		return res.status(404).json({ error: "product_not_found" });
	}
	return res.json(serializeProduct(product));
});

module.exports = router;

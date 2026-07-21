const express = require("express");
const { stores, getStoreById, getStoreByCode } = require("../data/stores");
const { getCategoryById } = require("../data/categories");

const router = express.Router();

function serializeStore(store) {
	return {
		id: store.id,
		code: store.code,
		name: store.name,
		address: store.address,
		businessHours: store.businessHours,
		categories: store.categoryIds.map((id) => getCategoryById(id)).filter(Boolean),
	};
}

router.get("/", (req, res) => {
	return res.json({
		stores: stores.map((s) => ({ id: s.id, code: s.code, name: s.name })),
	});
});

router.get("/resolve/:storeCode", (req, res) => {
	const store = getStoreByCode(req.params.storeCode);
	if (!store) {
		return res.status(404).json({ error: "store_not_found" });
	}
	return res.json({ storeId: store.id });
});

router.get("/:storeId/map", (req, res) => {
	const store = getStoreById(req.params.storeId);
	if (!store) {
		return res.status(404).json({ error: "store_not_found" });
	}
	return res.json({ storeId: store.id, ...store.map });
});

router.get("/:storeId", (req, res) => {
	const store = getStoreById(req.params.storeId);
	if (!store) {
		return res.status(404).json({ error: "store_not_found" });
	}
	return res.json(serializeStore(store));
});

module.exports = router;

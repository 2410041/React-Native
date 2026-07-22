const express = require("express");
const { checkDbHealth } = require("../db/pool");

const router = express.Router();

router.get("/", async (req, res) => {
	const dbOk = await checkDbHealth();
	const body = {
		status: dbOk ? "ok" : "error",
		api: "ok",
		db: dbOk ? "ok" : "error",
	};
	return res.status(dbOk ? 200 : 503).json(body);
});

module.exports = router;

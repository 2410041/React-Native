const path = require("path");
const express = require("express");

const storesRouter = require("./routes/stores");
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");

function createApp({ customerWebDistPath } = {}) {
	const app = express();

	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		next();
	});

	app.use("/api/stores", storesRouter);
	app.use("/api/categories", categoriesRouter);
	app.use("/api/products", productsRouter);

	app.use((req, res, next) => {
		if (req.path.startsWith("/api/")) {
			return res.status(404).json({ error: "not_found" });
		}
		return next();
	});

	if (customerWebDistPath) {
		app.use(express.static(customerWebDistPath));

		app.use((req, res, next) => {
			if (req.method !== "GET") {
				return next();
			}
			return res.sendFile(path.join(customerWebDistPath, "index.html"));
		});
	}

	return app;
}

module.exports = { createApp };

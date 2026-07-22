const path = require("path");
const express = require("express");

const storesRouter = require("./routes/stores");
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const healthRouter = require("./routes/health");

const PRIVATE_LAN_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1|(10|192\.168)\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})(:\d+)?$/;

function buildCorsMiddleware() {
	const allowList = (process.env.CORS_ORIGINS || "")
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean);
	const isDev = process.env.NODE_ENV !== "production";

	return (req, res, next) => {
		const origin = req.headers.origin;
		if (origin && (allowList.includes(origin) || (isDev && PRIVATE_LAN_ORIGIN.test(origin)))) {
			res.header("Access-Control-Allow-Origin", origin);
			res.header("Vary", "Origin");
		}
		next();
	};
}

function createApp({ customerWebDistPath } = {}) {
	const app = express();

	app.use(buildCorsMiddleware());

	app.use("/api/health", healthRouter);
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

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		console.error("[api] unhandled error:", err);
		if (req.path.startsWith("/api/")) {
			return res.status(500).json({ error: "internal_error" });
		}
		return res.status(500).send("Internal Server Error");
	});

	return app;
}

module.exports = { createApp };

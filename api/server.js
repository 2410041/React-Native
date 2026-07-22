const path = require("path");
const { createApp } = require("./src/app");
const { closePool } = require("./src/db/pool");

const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";
const SERVE_CUSTOMER_WEB = process.env.SERVE_CUSTOMER_WEB === "true";
const customerWebDistPath = SERVE_CUSTOMER_WEB
	? path.join(__dirname, "..", "customer-web", "dist")
	: undefined;

const app = createApp({ customerWebDistPath });

const server = app.listen(PORT, HOST, () => {
	console.log(`Urinavi API listening on http://${HOST}:${PORT}`);
});

async function shutdown(signal) {
	console.log(`${signal} received, shutting down gracefully...`);
	server.close(() => {
		console.log("HTTP server closed");
	});
	try {
		await closePool();
		console.log("DB pool closed");
	} catch (error) {
		console.error("Error closing DB pool:", error);
	} finally {
		process.exit(0);
	}
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

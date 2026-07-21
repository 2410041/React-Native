const path = require("path");
const { createApp } = require("./src/app");

const PORT = process.env.PORT || 4000;
const SERVE_CUSTOMER_WEB = process.env.SERVE_CUSTOMER_WEB === "true";
const customerWebDistPath = SERVE_CUSTOMER_WEB
	? path.join(__dirname, "..", "customer-web", "dist")
	: undefined;

const app = createApp({ customerWebDistPath });

app.listen(PORT, () => {
	console.log(`Urinavi API listening on http://localhost:${PORT}`);
});

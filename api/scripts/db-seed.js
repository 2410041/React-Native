const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const SEEDS_DIR = path.join(__dirname, "..", "database", "seeds");

async function run() {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT) || 3306,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		charset: "utf8mb4",
		multipleStatements: true,
	});

	try {
		const files = fs
			.readdirSync(SEEDS_DIR)
			.filter((f) => f.endsWith(".sql"))
			.sort();

		for (const file of files) {
			const sql = fs.readFileSync(path.join(SEEDS_DIR, file), "utf8");
			console.log(`[seed] applying ${file}`);
			await connection.query(sql);
		}

		console.log(`[seed] done (${files.length} file(s))`);
	} finally {
		await connection.end();
	}
}

run().catch((error) => {
	console.error("[seed] failed:", error);
	process.exit(1);
});

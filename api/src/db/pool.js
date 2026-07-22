const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT) || 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	charset: "utf8mb4",
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10,
	idleTimeout: 60000,
});

async function checkDbHealth() {
	try {
		await pool.query("SELECT 1");
		return true;
	} catch (error) {
		console.error("[db] health check failed:", error.message);
		return false;
	}
}

async function closePool() {
	await pool.end();
}

module.exports = { pool, checkDbHealth, closePool };

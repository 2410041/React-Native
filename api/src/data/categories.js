const categories = [
	{ id: "drug", name: "ドラッグ・雑貨" },
	{ id: "daily", name: "日配" },
	{ id: "grocery", name: "食品" },
	{ id: "beverage", name: "飲料" },
	{ id: "snack", name: "菓子" },
	{ id: "fresh", name: "生鮮" },
	{ id: "deli", name: "惣菜" },
];

function getCategoryById(id) {
	return categories.find((c) => c.id === id);
}

module.exports = { categories, getCategoryById };

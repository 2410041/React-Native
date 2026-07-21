const stores = [
	{
		id: "asuka",
		code: "0012",
		name: "飛鳥店",
		address: "大阪府高槻市飛鳥町1-2-3",
		businessHours: "9:00〜22:00（年中無休）",
		categoryIds: ["drug", "daily", "grocery", "beverage", "snack", "fresh", "deli"],
		map: {
			entrance: { x: 50, y: 96 },
			aisles: [
				{ aisleNumber: 1, sectionName: "青果", categoryId: "fresh", x: 6, y: 66, width: 12, height: 26 },
				{ aisleNumber: 2, sectionName: "調味料", categoryId: "grocery", x: 22, y: 66, width: 12, height: 26 },
				{ aisleNumber: 4, sectionName: "菓子", categoryId: "snack", x: 38, y: 66, width: 12, height: 26 },
				{ aisleNumber: 6, sectionName: "飲料", categoryId: "beverage", x: 54, y: 66, width: 12, height: 26 },
				{ aisleNumber: 8, sectionName: "日配", categoryId: "daily", x: 70, y: 40, width: 12, height: 26 },
				{ aisleNumber: 9, sectionName: "惣菜", categoryId: "deli", x: 70, y: 66, width: 12, height: 26 },
				{ aisleNumber: 10, sectionName: "ドラッグ・雑貨", categoryId: "drug", x: 86, y: 40, width: 12, height: 52 },
			],
		},
	},
	{
		id: "sakuradai",
		code: "0027",
		name: "桜台店",
		address: "大阪府茨木市桜台4-5-6",
		businessHours: "9:30〜21:30（年中無休）",
		categoryIds: ["drug", "daily", "grocery", "beverage", "snack", "fresh"],
		map: {
			entrance: { x: 50, y: 96 },
			aisles: [
				{ aisleNumber: 1, sectionName: "青果", categoryId: "fresh", x: 6, y: 66, width: 14, height: 26 },
				{ aisleNumber: 2, sectionName: "食品", categoryId: "grocery", x: 24, y: 66, width: 14, height: 26 },
				{ aisleNumber: 3, sectionName: "菓子", categoryId: "snack", x: 42, y: 66, width: 14, height: 26 },
				{ aisleNumber: 5, sectionName: "飲料", categoryId: "beverage", x: 60, y: 66, width: 14, height: 26 },
				{ aisleNumber: 7, sectionName: "日配", categoryId: "daily", x: 78, y: 40, width: 16, height: 26 },
				{ aisleNumber: 9, sectionName: "ドラッグ・雑貨", categoryId: "drug", x: 78, y: 68, width: 16, height: 24 },
			],
		},
	},
];

function getStoreById(id) {
	return stores.find((s) => s.id === id);
}

function getStoreByCode(code) {
	return stores.find((s) => s.code === code);
}

module.exports = { stores, getStoreById, getStoreByCode };

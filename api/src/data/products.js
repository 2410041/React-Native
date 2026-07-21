const products = [
	{
		id: "1",
		storeId: "asuka",
		janCode: "4902102112621",
		name: "コカ・コーラ 500ml",
		categoryId: "beverage",
		location: {
			aisleNumber: 6,
			sectionName: "飲料",
			landmark: "冷ケース横",
			nearbyProducts: ["午後の紅茶 ミルクティー", "い・ろ・は・す 天然水 555ml"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-15T08:10:00+09:00",
	},
	{
		id: "2",
		storeId: "asuka",
		janCode: "4909411084904",
		name: "午後の紅茶 ミルクティー",
		categoryId: "beverage",
		location: {
			aisleNumber: 6,
			sectionName: "飲料",
			landmark: "常温飲料棚 中段",
			nearbyProducts: ["コカ・コーラ 500ml", "十六茶 630ml"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-15T08:10:00+09:00",
	},
	{
		id: "3",
		storeId: "asuka",
		janCode: "4901330504250",
		name: "ポテトチップス うすしお",
		categoryId: "snack",
		location: {
			aisleNumber: 4,
			sectionName: "菓子",
			landmark: "スナック菓子棚",
			nearbyProducts: ["ポテトチップス コンソメパンチ", "柿の種"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-14T19:40:00+09:00",
	},
	{
		id: "4",
		storeId: "asuka",
		janCode: "4901330512637",
		name: "ポテトチップス コンソメパンチ",
		categoryId: "snack",
		location: {
			aisleNumber: 4,
			sectionName: "菓子",
			landmark: "スナック菓子棚 上段",
			nearbyProducts: ["ポテトチップス うすしお"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-14T19:40:00+09:00",
	},
	{
		id: "5",
		storeId: "asuka",
		janCode: "4901005202748",
		name: "キッコーマン しょうゆ 1L",
		categoryId: "grocery",
		location: {
			aisleNumber: 2,
			sectionName: "調味料",
			landmark: "醤油・みりんの近く",
			nearbyProducts: ["マンジョウ 本みりん 500ml", "米酢 500ml"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-13T10:05:00+09:00",
	},
	{
		id: "6",
		storeId: "asuka",
		janCode: "4901005203097",
		name: "マンジョウ 本みりん 500ml",
		categoryId: "grocery",
		location: {
			aisleNumber: 2,
			sectionName: "調味料",
			landmark: "醤油の右隣",
			nearbyProducts: ["キッコーマン しょうゆ 1L"],
		},
		handlingStatus: "一時休止",
		updatedAt: "2026-07-12T09:00:00+09:00",
	},
	{
		id: "7",
		storeId: "asuka",
		janCode: "4902220770199",
		name: "明治ブルガリアヨーグルト",
		categoryId: "daily",
		location: {
			aisleNumber: 8,
			sectionName: "日配",
			landmark: "乳製品ケース上段",
			nearbyProducts: ["森永 牛乳 1000ml"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-15T06:30:00+09:00",
	},
	{
		id: "8",
		storeId: "asuka",
		janCode: "4902102072994",
		name: "森永 牛乳 1000ml",
		categoryId: "daily",
		location: {
			aisleNumber: 8,
			sectionName: "日配",
			landmark: "乳製品ケース下段",
			nearbyProducts: ["明治ブルガリアヨーグルト"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-15T06:30:00+09:00",
	},
	{
		id: "9",
		storeId: "asuka",
		janCode: "4987176045213",
		name: "サラサラヘアシャンプー",
		categoryId: "drug",
		location: {
			aisleNumber: 10,
			sectionName: "ドラッグ・雑貨",
			landmark: "ヘアケア棚",
			nearbyProducts: ["キッチン用洗剤 詰替"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-11T14:20:00+09:00",
	},
	{
		id: "10",
		storeId: "asuka",
		janCode: "4901301234814",
		name: "キッチン用洗剤 詰替",
		categoryId: "drug",
		location: {
			aisleNumber: 10,
			sectionName: "ドラッグ・雑貨",
			landmark: "台所用品棚",
			nearbyProducts: ["サラサラヘアシャンプー"],
		},
		handlingStatus: "不明",
		updatedAt: "2026-07-08T11:00:00+09:00",
	},
	{
		id: "11",
		storeId: "asuka",
		janCode: "4901005605521",
		name: "アボカド 1玉",
		categoryId: "fresh",
		location: {
			aisleNumber: 1,
			sectionName: "青果",
			landmark: "入口正面の平台",
			nearbyProducts: ["国産バナナ 1房"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-15T07:00:00+09:00",
	},
	{
		id: "12",
		storeId: "asuka",
		janCode: "4901005605538",
		name: "国産バナナ 1房",
		categoryId: "fresh",
		location: {
			aisleNumber: 1,
			sectionName: "青果",
			landmark: "アボカドの隣",
			nearbyProducts: ["アボカド 1玉"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-15T07:00:00+09:00",
	},
	{
		id: "13",
		storeId: "asuka",
		janCode: "4901005605545",
		name: "彩り野菜の煮物 惣菜パック",
		categoryId: "deli",
		location: {
			aisleNumber: 9,
			sectionName: "惣菜",
			landmark: "レジ横惣菜ケース",
			nearbyProducts: ["若鶏のから揚げ"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-15T11:00:00+09:00",
	},
	{
		id: "14",
		storeId: "asuka",
		janCode: "4901005605552",
		name: "若鶏のから揚げ",
		categoryId: "deli",
		location: {
			aisleNumber: 9,
			sectionName: "惣菜",
			landmark: "温蔵ケース手前",
			nearbyProducts: ["彩り野菜の煮物 惣菜パック"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-15T11:00:00+09:00",
	},
	{
		id: "15",
		storeId: "asuka",
		janCode: "4901005605569",
		name: "十六茶 630ml",
		categoryId: "beverage",
		location: {
			aisleNumber: 6,
			sectionName: "飲料",
			landmark: "常温飲料棚 下段",
			nearbyProducts: ["午後の紅茶 ミルクティー"],
		},
		handlingStatus: "取扱いなし",
		updatedAt: "2026-07-05T09:00:00+09:00",
	},
	{
		id: "16",
		storeId: "asuka",
		janCode: "4901005605576",
		name: "い・ろ・は・す 天然水 555ml",
		categoryId: "beverage",
		location: {
			aisleNumber: 6,
			sectionName: "飲料",
			landmark: "冷ケース入口側",
			nearbyProducts: ["コカ・コーラ 500ml"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-15T08:10:00+09:00",
	},
	{
		id: "17",
		storeId: "sakuradai",
		janCode: "4902102112621",
		name: "コカ・コーラ 500ml",
		categoryId: "beverage",
		location: {
			aisleNumber: 5,
			sectionName: "飲料",
			landmark: "冷ケース横",
			nearbyProducts: ["午後の紅茶 ミルクティー"],
		},
		handlingStatus: "取扱いあり",
		updatedAt: "2026-07-15T08:00:00+09:00",
	},
	{
		id: "18",
		storeId: "sakuradai",
		janCode: "4901330504250",
		name: "ポテトチップス うすしお",
		categoryId: "snack",
		location: {
			aisleNumber: 3,
			sectionName: "菓子",
			landmark: "スナック菓子棚",
			nearbyProducts: [],
		},
		handlingStatus: "不明",
		updatedAt: "2026-07-10T09:00:00+09:00",
	},
];

function getProductById(id) {
	return products.find((p) => p.id === id);
}

function searchProducts({ keyword = "", storeId, categoryId }) {
	const trimmed = keyword.trim();
	let list = products.filter((p) => p.storeId === storeId);
	if (categoryId && categoryId !== "all") {
		list = list.filter((p) => p.categoryId === categoryId);
	}
	if (!trimmed) return list;
	if (/^\d+$/.test(trimmed)) {
		return list.filter((p) => p.janCode.includes(trimmed));
	}
	return list.filter((p) => p.name.includes(trimmed));
}

function getProductsByCategory(storeId, categoryId) {
	return products.filter((p) => p.storeId === storeId && p.categoryId === categoryId);
}

module.exports = { products, getProductById, searchProducts, getProductsByCategory };

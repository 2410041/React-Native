import { Employee } from "@/types/employee";
import { Product } from "@/types/product";
import { Store } from "@/types/store";

export const currentStore: Store = {
	id: "asuka",
	name: "明日香店",
};

export const mockEmployee: Employee = {
	employeeNumber: 67,
	name: "山口",
	storeId: "asuka",
	storeName: "明日香店",
};

export const mockProducts: Product[] = [
	{
		id: "1",
		storeId: "asuka",
		barcode: "4902102112621",
		name: "コカ・コーラ 500ml",
		aisleNumber: 6,
		sectionName: "飲料",
		landmark: "冷ケース横",
		stock: "あり",
		backyardStock: "少ない",
		guideNotes: [
			"入口から入って右奥の飲料通路です",
			"冷ケースのすぐ横に置いてください",
		],
	},
	{
		id: "2",
		storeId: "asuka",
		barcode: "4909411084904",
		name: "午後の紅茶 ミルクティー",
		aisleNumber: 6,
		sectionName: "飲料",
		landmark: "常温飲料棚 中段",
		stock: "あり",
		backyardStock: "あり",
		guideNotes: [
			"入口から入って右奥の飲料通路です",
			"常温飲料棚の中段に並べてください",
		],
	},
	{
		id: "3",
		storeId: "asuka",
		barcode: "4901330504250",
		name: "ポテトチップス うすしお",
		aisleNumber: 4,
		sectionName: "菓子",
		landmark: "スナック菓子棚",
		stock: "少ない",
		backyardStock: "なし",
		guideNotes: [
			"入口から入って左手の菓子通路です",
			"スナック菓子棚の目線の高さに置いてください",
		],
	},
];

export function getProductById(id: string): Product | undefined {
	return mockProducts.find((p) => p.id === id);
}

export function searchProducts(keyword: string, storeId: string): Product[] {
	const trimmed = keyword.trim();
	const storeProducts = mockProducts.filter((p) => p.storeId === storeId);
	if (!trimmed) return storeProducts;
	return storeProducts.filter((p) => p.name.includes(trimmed));
}

export function findProductByBarcode(
	barcode: string,
	storeId: string
): Product | undefined {
	return mockProducts.find(
		(p) => p.barcode === barcode && p.storeId === storeId
	);
}

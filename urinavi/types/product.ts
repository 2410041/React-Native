export type StockLevel = "あり" | "少ない" | "なし";

export type Product = {
	id: string;
	storeId: string;
	barcode: string;
	name: string;
	aisleNumber: number;
	sectionName: string;
	landmark: string;
	stock: StockLevel;
	backyardStock: StockLevel;
	guideNotes: string[];
};

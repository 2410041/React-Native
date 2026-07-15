import { Store } from "@/types/store";

export const stores: Store[] = [
	{
		id: "asuka",
		code: "0012",
		name: "飛鳥店",
		address: "大阪府高槻市飛鳥町1-2-3",
		businessHours: "9:00〜22:00（年中無休）",
		productCount: 8420,
		lastUpdatedAt: "2026-07-14T21:30:00+09:00",
		departmentCodes: ["drug", "daily", "grocery", "beverage", "snack", "fresh", "deli"],
	},
	{
		id: "sakuradai",
		code: "0027",
		name: "桜台店",
		address: "大阪府茨木市桜台4-5-6",
		businessHours: "9:30〜21:30（年中無休）",
		productCount: 7150,
		lastUpdatedAt: "2026-07-14T20:10:00+09:00",
		departmentCodes: ["drug", "daily", "grocery", "beverage", "snack", "fresh"],
	},
];

export function getStoreById(id: string): Store | undefined {
	return stores.find((s) => s.id === id);
}

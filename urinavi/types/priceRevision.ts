import { DepartmentCode } from "@/types/department";
import { HandlingStatus } from "@/types/handlingStatus";
import { StockStatus } from "@/types/stock";

export type PriceRevisionCheckState = "確認済み" | "未確認";

export type PriceRevisionTab =
	| "all"
	| "handled"
	| "inStock"
	| "outOfStock"
	| "unconfirmed"
	| "notHandled";

export type PriceRevisionItem = {
	id: string;
	janCode: string;
	name: string;
	imageIcon: string;
	departmentCode: DepartmentCode;
	storeId: string;
	handlingStatus: HandlingStatus;
	stockStatus: StockStatus;
	checkState: PriceRevisionCheckState;
};

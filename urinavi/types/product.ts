import { DepartmentCode } from "@/types/department";
import { HandlingStatus } from "@/types/handlingStatus";
import { StockStatus } from "@/types/stock";

export type ProductLocation = {
	aisleNumber: number;
	sectionName: string;
	landmark: string;
	nearbyProducts: string[];
	nearbyFacilities: string[];
};

export type Product = {
	id: string;
	storeId: string;
	janCode: string;
	name: string;
	departmentCode: DepartmentCode;
	location: ProductLocation;
	stock: StockStatus;
	backyardStock: StockStatus;
	handlingStatus: HandlingStatus;
	updatedAt: string;
	guideNotes: string[];
};

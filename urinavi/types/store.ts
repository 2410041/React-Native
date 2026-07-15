import { DepartmentCode } from "@/types/department";

export type Store = {
	id: string;
	code: string;
	name: string;
	address: string;
	businessHours: string;
	productCount: number;
	lastUpdatedAt: string;
	departmentCodes: DepartmentCode[];
};

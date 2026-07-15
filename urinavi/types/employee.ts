import { DepartmentCode } from "@/types/department";

export type EmployeeRole = "スタッフ" | "リーダー" | "店長";

export type Employee = {
	id: string;
	employeeNumber: number;
	name: string;
	storeId: string;
	role: EmployeeRole;
	normalDepartmentCode: DepartmentCode;
};

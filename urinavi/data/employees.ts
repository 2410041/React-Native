import { Employee } from "@/types/employee";

export const employees: Employee[] = [
	{
		id: "emp-1",
		employeeNumber: 67,
		name: "山口",
		storeId: "asuka",
		role: "スタッフ",
		normalDepartmentCode: "beverage",
	},
	{
		id: "emp-2",
		employeeNumber: 12,
		name: "田中",
		storeId: "asuka",
		role: "リーダー",
		normalDepartmentCode: "fresh",
	},
	{
		id: "emp-3",
		employeeNumber: 45,
		name: "佐藤",
		storeId: "asuka",
		role: "店長",
		normalDepartmentCode: "grocery",
	},
	{
		id: "emp-4",
		employeeNumber: 8,
		name: "鈴木",
		storeId: "sakuradai",
		role: "スタッフ",
		normalDepartmentCode: "daily",
	},
];

export function findEmployeeByNumber(employeeNumber: number): Employee | undefined {
	return employees.find((e) => e.employeeNumber === employeeNumber);
}

export const defaultEmployee = employees[0];

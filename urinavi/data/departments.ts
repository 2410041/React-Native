import { Department, DepartmentCode } from "@/types/department";

export const departments: Department[] = [
	{ code: "drug", internalCode: "10", name: "ドラッグ・雑貨" },
	{ code: "daily", internalCode: "20", name: "日配" },
	{ code: "grocery", internalCode: "30", name: "食品" },
	{ code: "beverage", internalCode: "40", name: "飲料" },
	{ code: "snack", internalCode: "50", name: "菓子" },
	{ code: "fresh", internalCode: "60", name: "生鮮" },
	{ code: "deli", internalCode: "70", name: "惣菜" },
];

export function getDepartmentByCode(code: DepartmentCode): Department {
	const department = departments.find((d) => d.code === code);
	if (!department) {
		throw new Error(`Unknown department code: ${code}`);
	}
	return department;
}

export function getDepartmentName(code: DepartmentCode): string {
	return getDepartmentByCode(code).name;
}

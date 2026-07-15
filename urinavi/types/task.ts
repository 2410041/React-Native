import { DepartmentCode } from "@/types/department";

export type TaskStatus = "未対応" | "対応中" | "完了";
export type TaskPriority = "高" | "中" | "低";

export type Task = {
	id: string;
	storeId: string;
	title: string;
	description: string;
	status: TaskStatus;
	priority: TaskPriority;
	departmentCode: DepartmentCode;
	dueDate: string;
};

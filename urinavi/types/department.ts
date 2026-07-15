export type DepartmentCode =
	| "drug"
	| "daily"
	| "grocery"
	| "beverage"
	| "snack"
	| "fresh"
	| "deli";

export type Department = {
	code: DepartmentCode;
	internalCode: string;
	name: string;
};

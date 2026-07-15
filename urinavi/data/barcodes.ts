export type MockBarcode = {
	janCode: string;
	label: string;
};

export const mockTestBarcodes: MockBarcode[] = [
	{ janCode: "4902102112621", label: "コカ・コーラ 500ml" },
	{ janCode: "4901330504250", label: "ポテトチップス うすしお" },
	{ janCode: "4901005605521", label: "アボカド 1玉" },
	{ janCode: "0000000000000", label: "該当商品なし（テスト用）" },
];

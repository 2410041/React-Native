import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/colors";
import { HandlingStatus } from "@/types/handlingStatus";
import { PriceRevisionCheckState } from "@/types/priceRevision";
import { StockStatus } from "@/types/stock";

export type StatusTone = "success" | "warning" | "danger" | "neutral" | "info";

export type StatusMeta = {
	label: string;
	tone: StatusTone;
	icon: keyof typeof Ionicons.glyphMap;
};

export const toneColors: Record<StatusTone, { bg: string; fg: string }> = {
	success: { bg: Colors.successBg, fg: Colors.success },
	warning: { bg: Colors.warningBg, fg: Colors.warning },
	danger: { bg: "#FEE2E2", fg: Colors.danger },
	neutral: { bg: Colors.grayBg, fg: Colors.gray },
	info: { bg: Colors.primaryLight, fg: Colors.primary },
};

export function getStockStatusMeta(status: StockStatus): StatusMeta {
	switch (status) {
		case "あり":
			return { label: "あり", tone: "success", icon: "checkmark-circle" };
		case "少ない":
			return { label: "少ない", tone: "warning", icon: "alert-circle" };
		case "なし":
			return { label: "なし", tone: "danger", icon: "close-circle" };
		case "未確認":
		default:
			return { label: "未確認", tone: "neutral", icon: "help-circle" };
	}
}

export function getHandlingStatusMeta(status: HandlingStatus): StatusMeta {
	switch (status) {
		case "取扱いあり":
			return { label: "取扱いあり", tone: "success", icon: "checkmark-circle" };
		case "取扱いなし":
			return { label: "取扱いなし", tone: "danger", icon: "close-circle" };
		case "一時休止":
			return { label: "一時休止", tone: "warning", icon: "pause-circle" };
		case "不明":
		default:
			return { label: "不明", tone: "neutral", icon: "help-circle" };
	}
}

export function getPriceRevisionCheckStateMeta(state: PriceRevisionCheckState): StatusMeta {
	switch (state) {
		case "確認済み":
			return { label: "確認済み", tone: "success", icon: "checkmark-done-circle" };
		case "未確認":
		default:
			return { label: "未確認", tone: "neutral", icon: "ellipse-outline" };
	}
}

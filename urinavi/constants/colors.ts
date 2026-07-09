export const Colors = {
	primary: "#008A3D",
	primaryDark: "#00622C",
	primaryLight: "#E7F7ED",
	primarySoft: "#DCFCE7",
	white: "#FFFFFF",
	background: "#F2FAF5",
	surface: "#FFFFFF",
	border: "#E5E7EB",
	text: "#111827",
	textSub: "#4B5563",
	textMuted: "#9CA3AF",
	danger: "#DC2626",
	warning: "#F59E0B",
	warningBg: "#FEF3C7",
	success: "#16A34A",
	successBg: "#DCFCE7",
	gray: "#9CA3AF",
	grayBg: "#F3F4F6",
} as const;

export const Gradients = {
	primary: [Colors.primary, Colors.primaryDark] as const,
	header: ["#00A34A", Colors.primary] as const,
};

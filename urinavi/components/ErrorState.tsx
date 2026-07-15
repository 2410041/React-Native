import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { SecondaryButton } from "@/components/SecondaryButton";
import { Colors } from "@/constants/colors";

export type ErrorStateVariant = "error" | "network" | "permission" | "validation";

const variantMeta: Record<
	ErrorStateVariant,
	{ icon: keyof typeof Ionicons.glyphMap; title: string; message: string }
> = {
	error: {
		icon: "alert-circle-outline",
		title: "通信エラーが発生しました",
		message: "しばらくしてからもう一度お試しください",
	},
	network: {
		icon: "cloud-offline-outline",
		title: "ネットワークに接続できません",
		message: "電波状況をご確認のうえ、もう一度お試しください",
	},
	permission: {
		icon: "lock-closed-outline",
		title: "権限がありません",
		message: "この機能を利用するには許可が必要です",
	},
	validation: {
		icon: "warning-outline",
		title: "入力内容を確認してください",
		message: "内容に誤りがないかご確認ください",
	},
};

type ErrorStateProps = {
	variant?: ErrorStateVariant;
	title?: string;
	message?: string;
	onRetry?: () => void;
	retryLabel?: string;
};

export function ErrorState({
	variant = "error",
	title,
	message,
	onRetry,
	retryLabel = "再試行",
}: ErrorStateProps) {
	const meta = variantMeta[variant];
	return (
		<View style={styles.container}>
			<Ionicons name={meta.icon} size={44} color={Colors.danger} />
			<Text style={styles.title}>{title ?? meta.title}</Text>
			<Text style={styles.message}>{message ?? meta.message}</Text>
			{onRetry && (
				<View style={styles.actionWrap}>
					<SecondaryButton label={retryLabel} icon="refresh" onPress={onRetry} />
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 32,
		paddingVertical: 40,
		gap: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
		textAlign: "center",
	},
	message: {
		fontSize: 13,
		color: Colors.textMuted,
		textAlign: "center",
		lineHeight: 19,
	},
	actionWrap: {
		marginTop: 12,
		width: "100%",
		maxWidth: 280,
	},
});

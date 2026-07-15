import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "@/components/PrimaryButton";
import { Colors } from "@/constants/colors";

type EmptyStateProps = {
	icon?: keyof typeof Ionicons.glyphMap;
	title: string;
	message?: string;
	actionLabel?: string;
	onAction?: () => void;
};

export function EmptyState({
	icon = "file-tray-outline",
	title,
	message,
	actionLabel,
	onAction,
}: EmptyStateProps) {
	return (
		<View style={styles.container}>
			<Ionicons name={icon} size={48} color={Colors.textMuted} />
			<Text style={styles.title}>{title}</Text>
			{message && <Text style={styles.message}>{message}</Text>}
			{actionLabel && onAction && (
				<View style={styles.actionWrap}>
					<PrimaryButton label={actionLabel} onPress={onAction} />
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

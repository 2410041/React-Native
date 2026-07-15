import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";

type LoadingStateProps = {
	message?: string;
};

export function LoadingState({ message = "読み込み中です…" }: LoadingStateProps) {
	return (
		<View style={styles.container} accessibilityLabel={message} accessibilityRole="progressbar">
			<ActivityIndicator size="large" color={Colors.primary} />
			<Text style={styles.message}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 48,
		gap: 14,
	},
	message: {
		fontSize: 14,
		color: Colors.textSub,
		fontWeight: "600",
	},
});

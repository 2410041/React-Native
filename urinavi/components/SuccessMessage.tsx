import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";

type SuccessMessageProps = {
	message: string;
};

export function SuccessMessage({ message }: SuccessMessageProps) {
	return (
		<View style={styles.container} accessibilityLiveRegion="polite">
			<Ionicons name="checkmark-circle" size={20} color={Colors.success} />
			<Text style={styles.text}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: Colors.successBg,
		borderRadius: 12,
		paddingVertical: 10,
		paddingHorizontal: 14,
	},
	text: {
		flex: 1,
		fontSize: 13,
		fontWeight: "600",
		color: Colors.success,
	},
});

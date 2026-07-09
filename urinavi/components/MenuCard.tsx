import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/colors";

type MenuCardProps = {
	icon: keyof typeof Ionicons.glyphMap;
	title: string;
	subtitle: string;
	onPress?: () => void;
};

export function MenuCard({ icon, title, subtitle, onPress }: MenuCardProps) {
	return (
		<TouchableOpacity
			style={styles.card}
			onPress={onPress}
			activeOpacity={0.7}>
			<View style={styles.iconCircle}>
				<Ionicons name={icon} size={26} color={Colors.primary} />
			</View>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexBasis: "47%",
		flexGrow: 1,
		backgroundColor: Colors.surface,
		borderRadius: 20,
		paddingVertical: 22,
		paddingHorizontal: 14,
		alignItems: "center",
		shadowColor: "#000",
		shadowOpacity: 0.06,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 3 },
		elevation: 2,
	},
	iconCircle: {
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 12,
		color: Colors.textSub,
		textAlign: "center",
		lineHeight: 17,
	},
});

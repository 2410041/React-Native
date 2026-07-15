import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/colors";

type SectionTitleProps = {
	title: string;
	actionLabel?: string;
	onActionPress?: () => void;
};

export function SectionTitle({ title, actionLabel, onActionPress }: SectionTitleProps) {
	return (
		<View style={styles.row}>
			<Text style={styles.title}>{title}</Text>
			{actionLabel && onActionPress && (
				<TouchableOpacity onPress={onActionPress} hitSlop={8}>
					<Text style={styles.action}>{actionLabel}</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	title: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.textSub,
	},
	action: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.primary,
	},
});

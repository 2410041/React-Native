import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { StatusMeta, toneColors } from "@/components/statusMeta";

type StatusBadgeProps = {
	meta: StatusMeta;
	size?: "small" | "medium";
};

export function StatusBadge({ meta, size = "medium" }: StatusBadgeProps) {
	const colors = toneColors[meta.tone];
	const isSmall = size === "small";
	return (
		<View
			style={[
				styles.badge,
				{ backgroundColor: colors.bg, paddingVertical: isSmall ? 3 : 5 },
			]}
			accessibilityLabel={meta.label}>
			<Ionicons name={meta.icon} size={isSmall ? 12 : 14} color={colors.fg} />
			<Text style={[styles.text, { color: colors.fg, fontSize: isSmall ? 11 : 12 }]}>
				{meta.label}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingHorizontal: 10,
		borderRadius: 999,
		alignSelf: "flex-start",
	},
	text: {
		fontWeight: "700",
	},
});

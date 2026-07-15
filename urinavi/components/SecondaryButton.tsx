import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Colors } from "@/constants/colors";

type SecondaryButtonProps = {
	label: string;
	onPress: () => void;
	icon?: keyof typeof Ionicons.glyphMap;
	disabled?: boolean;
	danger?: boolean;
	accessibilityLabel?: string;
};

export function SecondaryButton({
	label,
	onPress,
	icon,
	disabled = false,
	danger = false,
	accessibilityLabel,
}: SecondaryButtonProps) {
	const color = danger ? Colors.danger : Colors.primary;
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={onPress}
			disabled={disabled}
			accessibilityRole="button"
			accessibilityState={{ disabled }}
			accessibilityLabel={accessibilityLabel ?? label}
			style={[
				styles.button,
				{ borderColor: color, opacity: disabled ? 0.5 : 1 },
			]}>
			{icon && <Ionicons name={icon} size={18} color={color} />}
			<Text style={[styles.text, { color }]}>{label}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		paddingVertical: 14,
		minHeight: 48,
		borderRadius: 14,
		borderWidth: 1.5,
	},
	text: {
		fontSize: 15,
		fontWeight: "700",
	},
});

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Colors, Gradients } from "@/constants/colors";

type PrimaryButtonProps = {
	label: string;
	onPress: () => void;
	icon?: keyof typeof Ionicons.glyphMap;
	disabled?: boolean;
	accessibilityLabel?: string;
};

export function PrimaryButton({
	label,
	onPress,
	icon,
	disabled = false,
	accessibilityLabel,
}: PrimaryButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.85}
			onPress={onPress}
			disabled={disabled}
			accessibilityRole="button"
			accessibilityState={{ disabled }}
			accessibilityLabel={accessibilityLabel ?? label}
			style={styles.wrapper}>
			<LinearGradient
				colors={disabled ? [Colors.gray, Colors.textMuted] : Gradients.primary}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.button}>
				{icon && <Ionicons name={icon} size={20} color={Colors.white} />}
				<Text style={styles.text}>{label}</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		borderRadius: 16,
		overflow: "hidden",
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		paddingVertical: 16,
		minHeight: 52,
	},
	text: {
		color: Colors.white,
		fontSize: 16,
		fontWeight: "700",
	},
});

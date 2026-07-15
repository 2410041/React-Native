import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Gradients } from "@/constants/colors";

type AppHeaderProps = {
	title: string;
	subtitle?: string;
	showBack?: boolean;
	onBack?: () => void;
	rightIcon?: keyof typeof Ionicons.glyphMap;
	onRightPress?: () => void;
	rightAccessibilityLabel?: string;
	rightBadge?: boolean;
};

export function AppHeader({
	title,
	subtitle,
	showBack = true,
	onBack,
	rightIcon,
	onRightPress,
	rightAccessibilityLabel,
	rightBadge = false,
}: AppHeaderProps) {
	return (
		<LinearGradient
			colors={Gradients.header}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.wrapper}>
			<SafeAreaView edges={["top"]}>
				<View style={styles.row}>
					<View style={styles.side}>
						{showBack && (
							<TouchableOpacity
								onPress={onBack ?? (() => router.back())}
								hitSlop={12}
								style={styles.iconButton}
								accessibilityRole="button"
								accessibilityLabel="戻る">
								<Ionicons name="chevron-back" size={22} color={Colors.white} />
							</TouchableOpacity>
						)}
					</View>

					<View style={styles.titleArea}>
						<Text style={styles.title} numberOfLines={1}>
							{title}
						</Text>
						{subtitle && (
							<Text style={styles.subtitle} numberOfLines={1}>
								{subtitle}
							</Text>
						)}
					</View>

					<View style={styles.side}>
						{rightIcon && (
							<TouchableOpacity
								onPress={onRightPress}
								hitSlop={12}
								style={styles.iconButton}
								accessibilityRole="button"
								accessibilityLabel={rightAccessibilityLabel ?? "その他の操作"}>
								<Ionicons name={rightIcon} size={20} color={Colors.white} />
								{rightBadge && <View style={styles.badgeDot} />}
							</TouchableOpacity>
						)}
					</View>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
		shadowColor: "#00341A",
		shadowOpacity: 0.16,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 4 },
		elevation: 3,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		minHeight: 56,
		paddingHorizontal: 10,
		paddingTop: 6,
		paddingBottom: 12,
		gap: 4,
	},
	side: {
		width: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	iconButton: {
		width: 38,
		height: 38,
		borderRadius: 19,
		backgroundColor: "rgba(255,255,255,0.2)",
		alignItems: "center",
		justifyContent: "center",
	},
	titleArea: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontSize: 17,
		fontWeight: "800",
		color: Colors.white,
	},
	subtitle: {
		fontSize: 12,
		fontWeight: "600",
		color: Colors.primaryLight,
		marginTop: 2,
	},
	badgeDot: {
		position: "absolute",
		top: 5,
		right: 5,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Colors.danger,
		borderWidth: 1.5,
		borderColor: Colors.white,
	},
});

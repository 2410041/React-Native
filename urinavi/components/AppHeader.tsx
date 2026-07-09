import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Gradients } from "@/constants/colors";

type AppHeaderProps = {
	title: string;
	showBack?: boolean;
	onBack?: () => void;
	rightIcon?: keyof typeof Ionicons.glyphMap;
	onRightPress?: () => void;
};

export function AppHeader({
	title,
	showBack = true,
	onBack,
	rightIcon,
	onRightPress,
}: AppHeaderProps) {
	return (
		<LinearGradient colors={Gradients.header} style={styles.gradient}>
			<SafeAreaView edges={["top"]}>
				<View style={styles.row}>
					<View style={styles.side}>
						{showBack && (
							<TouchableOpacity
								onPress={onBack ?? (() => router.back())}
								hitSlop={12}
								style={styles.iconButton}>
								<Ionicons name="chevron-back" size={26} color={Colors.white} />
							</TouchableOpacity>
						)}
					</View>
					<Text style={styles.title} numberOfLines={1}>
						{title}
					</Text>
					<View style={styles.side}>
						{rightIcon && (
							<TouchableOpacity
								onPress={onRightPress}
								hitSlop={12}
								style={styles.iconButton}>
								<Ionicons name={rightIcon} size={24} color={Colors.white} />
							</TouchableOpacity>
						)}
					</View>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	gradient: {
		paddingBottom: 4,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 52,
		paddingHorizontal: 8,
	},
	side: {
		width: 44,
		alignItems: "center",
	},
	iconButton: {
		padding: 6,
	},
	title: {
		flex: 1,
		textAlign: "center",
		fontSize: 18,
		fontWeight: "700",
		color: Colors.white,
	},
});

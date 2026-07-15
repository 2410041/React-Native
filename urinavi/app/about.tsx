import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Colors } from "@/constants/colors";

const links: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
	{ icon: "document-text-outline", label: "利用規約" },
	{ icon: "shield-checkmark-outline", label: "プライバシーポリシー" },
	{ icon: "code-slash-outline", label: "ライセンス" },
];

export default function AboutScreen() {
	const version = Constants.expoConfig?.version ?? "1.0.0";

	return (
		<View style={styles.screen}>
			<AppHeader title="アプリ情報" />

			<ScreenContainer scroll>
				<View style={styles.logoArea}>
					<View style={styles.logoCircle}>
						<Ionicons name="cart" size={36} color={Colors.primary} />
					</View>
					<Text style={styles.appName}>Urinavi</Text>
					<Text style={styles.appSub}>従業員用アプリ</Text>
					<Text style={styles.version}>バージョン {version}</Text>
				</View>

				<View style={styles.card}>
					{links.map((link) => (
						<TouchableOpacity
							key={link.label}
							style={styles.linkRow}
							activeOpacity={0.7}
							accessibilityRole="button"
							accessibilityLabel={link.label}>
							<Ionicons name={link.icon} size={20} color={Colors.textSub} />
							<Text style={styles.linkLabel}>{link.label}</Text>
							<Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
						</TouchableOpacity>
					))}
				</View>

				<Text style={styles.copyright}>© 2026 Urinavi Project</Text>
			</ScreenContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	logoArea: {
		alignItems: "center",
		gap: 4,
		marginBottom: 24,
	},
	logoCircle: {
		width: 76,
		height: 76,
		borderRadius: 38,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
	},
	appName: {
		fontSize: 24,
		fontWeight: "800",
		color: Colors.primary,
	},
	appSub: {
		fontSize: 13,
		color: Colors.textSub,
	},
	version: {
		fontSize: 12,
		color: Colors.textMuted,
		marginTop: 6,
	},
	card: {
		backgroundColor: Colors.surface,
		borderRadius: 16,
		padding: 8,
		marginBottom: 24,
	},
	linkRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 14,
		paddingHorizontal: 10,
		minHeight: 48,
		borderBottomWidth: 1,
		borderBottomColor: Colors.border,
	},
	linkLabel: {
		flex: 1,
		fontSize: 15,
		fontWeight: "600",
		color: Colors.text,
	},
	copyright: {
		fontSize: 12,
		color: Colors.textMuted,
		textAlign: "center",
	},
});

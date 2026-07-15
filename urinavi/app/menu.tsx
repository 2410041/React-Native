import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "@/components/BottomNav";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Colors, Gradients } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { getDepartmentName } from "@/data/departments";

const menuItems: { icon: keyof typeof Ionicons.glyphMap; label: string; href: Href }[] = [
	{ icon: "person-circle-outline", label: "従業員情報", href: "/employee" },
	{ icon: "storefront-outline", label: "店舗情報", href: "/store" },
	{ icon: "settings-outline", label: "設定", href: "/settings" },
	{ icon: "help-circle-outline", label: "ヘルプ", href: "/help" },
	{ icon: "information-circle-outline", label: "アプリ情報", href: "/about" },
];

export default function MenuScreen() {
	const { employee, store, logout } = useApp();
	const [confirmVisible, setConfirmVisible] = useState(false);

	return (
		<View style={styles.screen}>
			<LinearGradient colors={Gradients.header} style={styles.header}>
				<SafeAreaView edges={["top"]}>
					<Text style={styles.headerTitle}>メニュー</Text>
				</SafeAreaView>
			</LinearGradient>

			<View style={styles.content}>
				<View style={styles.profileCard}>
					<View style={styles.avatar}>
						<Ionicons name="person" size={28} color={Colors.primary} />
					</View>
					<View style={styles.profileText}>
						<Text style={styles.profileName} numberOfLines={1}>
							{employee?.name}さん（{employee?.employeeNumber}番）
						</Text>
						<Text style={styles.profileStore} numberOfLines={1}>
							{store?.name}
							{employee ? ` ／ ${getDepartmentName(employee.normalDepartmentCode)}` : ""}
						</Text>
					</View>
				</View>

				{menuItems.map((item) => (
					<TouchableOpacity
						key={item.label}
						style={styles.menuRow}
						activeOpacity={0.7}
						onPress={() => router.push(item.href)}
						accessibilityRole="button"
						accessibilityLabel={item.label}>
						<Ionicons name={item.icon} size={20} color={Colors.textSub} />
						<Text style={styles.menuLabel}>{item.label}</Text>
						<Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
					</TouchableOpacity>
				))}

				<TouchableOpacity
					style={styles.logoutButton}
					activeOpacity={0.7}
					onPress={() => setConfirmVisible(true)}
					accessibilityRole="button"
					accessibilityLabel="ログアウト">
					<Ionicons name="log-out-outline" size={20} color={Colors.danger} />
					<Text style={styles.logoutText}>ログアウト</Text>
				</TouchableOpacity>
			</View>

			<ConfirmModal
				visible={confirmVisible}
				title="ログアウトしますか？"
				message="ログイン画面に戻ります。"
				confirmLabel="ログアウト"
				destructive
				onConfirm={() => {
					setConfirmVisible(false);
					logout();
					router.replace("/login");
				}}
				onCancel={() => setConfirmVisible(false)}
			/>

			<BottomNav active="menu" />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	header: {
		borderBottomLeftRadius: 28,
		borderBottomRightRadius: 28,
		paddingBottom: 20,
	},
	headerTitle: {
		color: Colors.white,
		fontSize: 22,
		fontWeight: "800",
		paddingHorizontal: 22,
		paddingTop: 16,
	},
	content: {
		flex: 1,
		padding: 20,
	},
	profileCard: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14,
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 16,
		marginBottom: 20,
	},
	avatar: {
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
	},
	profileText: {
		flex: 1,
	},
	profileName: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
	},
	profileStore: {
		fontSize: 13,
		color: Colors.textMuted,
		marginTop: 2,
	},
	menuRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		backgroundColor: Colors.surface,
		borderRadius: 14,
		paddingVertical: 14,
		paddingHorizontal: 16,
		marginBottom: 10,
		minHeight: 52,
	},
	menuLabel: {
		flex: 1,
		fontSize: 15,
		color: Colors.text,
		fontWeight: "600",
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		marginTop: 16,
		paddingVertical: 14,
		minHeight: 48,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: Colors.danger,
	},
	logoutText: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.danger,
	},
});

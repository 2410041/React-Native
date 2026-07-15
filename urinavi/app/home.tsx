import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Href, Redirect, router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "@/components/BottomNav";
import { MenuCard } from "@/components/MenuCard";
import { Colors, Gradients } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { departments } from "@/data/departments";

function getGreeting(): string {
	const hour = new Date().getHours();
	if (hour < 11) return "おはようございます、";
	if (hour < 17) return "こんにちは、";
	return "お疲れ様です、";
}

type HomeMenuItem = {
	id: string;
	title: string;
	description: string;
	icon: keyof typeof Ionicons.glyphMap;
	route: Href;
};

const homeMenuItems: HomeMenuItem[] = [
	{
		id: "search",
		title: "商品検索",
		description: "商品名で探す",
		icon: "search",
		route: "/search",
	},
	{
		id: "barcode",
		title: "バーコード読取",
		description: "納品・戻し商品の場所確認",
		icon: "barcode",
		route: "/barcode",
	},
	{
		id: "map",
		title: "売場マップ",
		description: "売場全体を確認",
		icon: "map",
		route: "/map/store",
	},
	{
		id: "history",
		title: "最近見た商品",
		description: "直前の商品をすぐ確認",
		icon: "time",
		route: "/history",
	},
];

export default function HomeScreen() {
	const { employee, store, currentDepartment, isHelpingOtherDepartment, unreadNotificationCount } =
		useApp();

	if (!employee || !store) {
		return <Redirect href="/login" />;
	}

	const currentDepartmentName =
		currentDepartment === "all"
			? "すべての部門"
			: departments.find((d) => d.code === currentDepartment)?.name ?? currentDepartment;

	return (
		<View style={styles.screen}>
			<LinearGradient
				colors={Gradients.header}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.header}>
				<SafeAreaView edges={["top"]}>
					<View style={styles.headerRow}>
						<View style={styles.headerTextArea}>
							<Text style={styles.greeting}>{getGreeting()}</Text>
							<Text style={styles.employeeName} numberOfLines={1}>
								{employee.name}さん（{employee.employeeNumber}番）
							</Text>
							<View style={styles.storeRow}>
								<Ionicons name="storefront" size={13} color={Colors.white} />
								<Text style={styles.storeName} numberOfLines={1}>
									{store.name}
								</Text>
							</View>
						</View>
						<TouchableOpacity
							style={styles.bellButton}
							hitSlop={10}
							onPress={() => router.push("/notifications")}
							accessibilityRole="button"
							accessibilityLabel="通知一覧を開く">
							<Ionicons name="notifications-outline" size={22} color={Colors.white} />
							{unreadNotificationCount > 0 && (
								<View style={styles.badge}>
									<Text style={styles.badgeText}>
										{unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
									</Text>
								</View>
							)}
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						style={styles.departmentRow}
						activeOpacity={0.8}
						onPress={() => router.push("/department")}
						accessibilityRole="button"
						accessibilityLabel="担当部門を切り替える">
						<View style={styles.departmentIconWrap}>
							<Ionicons name="pricetag" size={13} color={Colors.primaryDark} />
						</View>
						<Text style={styles.departmentText} numberOfLines={1}>
							担当部門：{currentDepartmentName}
							{isHelpingOtherDepartment ? "（応援中）" : ""}
						</Text>
						<Ionicons name="chevron-forward" size={16} color={Colors.primaryDark} />
					</TouchableOpacity>
				</SafeAreaView>
			</LinearGradient>

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.cardGrid}>
					{homeMenuItems.map((item) => (
						<MenuCard
							key={item.id}
							icon={item.icon}
							title={item.title}
							subtitle={item.description}
							onPress={() => router.push(item.route)}
						/>
					))}
				</View>
			</ScrollView>

			<BottomNav active="home" />
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
		shadowColor: "#00341A",
		shadowOpacity: 0.18,
		shadowRadius: 14,
		shadowOffset: { width: 0, height: 5 },
		elevation: 3,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		paddingHorizontal: 22,
		paddingTop: 14,
		gap: 10,
	},
	headerTextArea: {
		flex: 1,
	},
	greeting: {
		color: Colors.primaryLight,
		fontSize: 13,
		marginBottom: 4,
	},
	employeeName: {
		color: Colors.white,
		fontSize: 21,
		fontWeight: "800",
	},
	storeRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginTop: 4,
	},
	storeName: {
		color: Colors.primaryLight,
		fontSize: 13,
		fontWeight: "600",
	},
	bellButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(255,255,255,0.2)",
		alignItems: "center",
		justifyContent: "center",
	},
	badge: {
		position: "absolute",
		top: -2,
		right: -2,
		minWidth: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: Colors.danger,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 3,
		borderWidth: 1.5,
		borderColor: Colors.white,
	},
	badgeText: {
		fontSize: 10,
		fontWeight: "800",
		color: Colors.white,
	},
	departmentRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: Colors.white,
		marginHorizontal: 22,
		marginTop: 16,
		marginBottom: 20,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderRadius: 14,
		minHeight: 44,
	},
	departmentIconWrap: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
	},
	departmentText: {
		flex: 1,
		color: Colors.primaryDark,
		fontSize: 13,
		fontWeight: "700",
	},
	content: {
		padding: 20,
		paddingBottom: 40,
	},
	cardGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 14,
	},
});

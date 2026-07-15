import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, router } from "expo-router";
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
			<LinearGradient colors={Gradients.header} style={styles.header}>
				<SafeAreaView edges={["top"]}>
					<View style={styles.headerRow}>
						<View style={styles.headerTextArea}>
							<Text style={styles.greeting}>{getGreeting()}</Text>
							<Text style={styles.employeeName} numberOfLines={1}>
								{employee.name}さん（{employee.employeeNumber}番）
							</Text>
							<Text style={styles.storeName} numberOfLines={1}>
								{store.name}
							</Text>
						</View>
						<TouchableOpacity
							style={styles.bellButton}
							hitSlop={10}
							onPress={() => router.push("/notifications")}
							accessibilityRole="button"
							accessibilityLabel="通知一覧を開く">
							<Ionicons name="notifications-outline" size={24} color={Colors.white} />
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
						<Ionicons name="pricetag" size={14} color={Colors.white} />
						<Text style={styles.departmentText} numberOfLines={1}>
							担当部門：{currentDepartmentName}
							{isHelpingOtherDepartment ? "（応援中）" : ""}
						</Text>
						<Ionicons name="chevron-forward" size={14} color={Colors.white} />
					</TouchableOpacity>
				</SafeAreaView>
			</LinearGradient>

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.cardGrid}>
					<MenuCard
						icon="search"
						title="商品検索"
						subtitle="商品名で探す"
						onPress={() => router.push("/search")}
					/>
					<MenuCard
						icon="barcode"
						title="バーコード読取"
						subtitle={"納品・戻し商品の\n場所確認"}
						onPress={() => router.push("/barcode")}
					/>
					<MenuCard
						icon="map"
						title="売場マップ"
						subtitle="売場全体を確認"
						onPress={() => router.push("/map/store")}
					/>
					<MenuCard
						icon="time"
						title="最近見た商品"
						subtitle={"直前の商品を\nすぐ確認"}
						onPress={() => router.push("/history")}
					/>
					<MenuCard
						icon="pricetags"
						title="価格改定チェック"
						subtitle={"対象商品の\n取扱いを確認"}
						onPress={() => router.push("/price-revision")}
					/>
					<MenuCard
						icon="swap-horizontal"
						title="担当部門切り替え"
						subtitle={"応援・担当部門を\n変更する"}
						onPress={() => router.push("/department")}
					/>
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
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		paddingHorizontal: 22,
		paddingTop: 12,
		gap: 10,
	},
	headerTextArea: {
		flex: 1,
	},
	greeting: {
		color: Colors.primaryLight,
		fontSize: 14,
		marginBottom: 4,
	},
	employeeName: {
		color: Colors.white,
		fontSize: 22,
		fontWeight: "800",
	},
	storeName: {
		color: Colors.primaryLight,
		fontSize: 13,
		marginTop: 2,
	},
	bellButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(255,255,255,0.18)",
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
		borderColor: Colors.primary,
	},
	badgeText: {
		fontSize: 10,
		fontWeight: "800",
		color: Colors.white,
	},
	departmentRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		backgroundColor: "rgba(255,255,255,0.16)",
		marginHorizontal: 22,
		marginTop: 16,
		marginBottom: 20,
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 12,
		minHeight: 44,
	},
	departmentText: {
		flex: 1,
		color: Colors.white,
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

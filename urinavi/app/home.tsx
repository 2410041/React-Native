import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "@/components/BottomNav";
import { MenuCard } from "@/components/MenuCard";
import { Colors, Gradients } from "@/constants/colors";
import { mockEmployee } from "@/constants/mockData";

export default function HomeScreen() {
	return (
		<View style={styles.screen}>
			<LinearGradient colors={Gradients.header} style={styles.header}>
				<SafeAreaView edges={["top"]}>
					<View style={styles.headerRow}>
						<View>
							<Text style={styles.greeting}>おはようございます、</Text>
							<Text style={styles.employeeName}>
								{mockEmployee.name}さん（{mockEmployee.employeeNumber}番）
							</Text>
						</View>
						<TouchableOpacity style={styles.bellButton} hitSlop={10}>
							<Ionicons name="notifications-outline" size={24} color={Colors.white} />
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</LinearGradient>

			<ScrollView contentContainerStyle={styles.content}>
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
						onPress={() => router.push("/map/1")}
					/>
					<MenuCard
						icon="time"
						title="最近見た商品"
						subtitle={"直前の商品を\nすぐ確認"}
						onPress={() => router.push("/history")}
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
		paddingBottom: 28,
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
	bellButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(255,255,255,0.18)",
		alignItems: "center",
		justifyContent: "center",
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

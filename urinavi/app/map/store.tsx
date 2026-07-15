import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";

const MAP_MIN_WIDTH = 340;

const zoneRows: { name: string; flex: number; tone: "light" | "gray" }[][] = [
	[
		{ name: "青果", flex: 1, tone: "light" },
		{ name: "鮮魚", flex: 1, tone: "light" },
		{ name: "精肉", flex: 1, tone: "light" },
	],
	[
		{ name: "1〜3番 食品・調味料", flex: 2, tone: "gray" },
		{ name: "4番 菓子", flex: 1, tone: "gray" },
	],
	[
		{ name: "6番 飲料", flex: 1, tone: "gray" },
		{ name: "8番 日配", flex: 1, tone: "gray" },
		{ name: "10番 ドラッグ・雑貨", flex: 1, tone: "gray" },
	],
	[
		{ name: "9番 惣菜", flex: 1, tone: "light" },
		{ name: "レジ", flex: 1, tone: "gray" },
	],
];

export default function StoreMapScreen() {
	const { store } = useApp();

	if (!store) {
		return <Redirect href="/home" />;
	}

	return (
		<View style={styles.screen}>
			<AppHeader title="店舗全体マップ" />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.storeName}>{store.name}</Text>
				<Text style={styles.subtitle}>売場の大まかな配置です（棚番はありません）</Text>

				<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mapScroll}>
					<View style={styles.mapCard}>
						{zoneRows.map((row, rowIndex) => (
							<View key={rowIndex} style={styles.row}>
								{row.map((zone) => (
									<View
										key={zone.name}
										style={[
											styles.zone,
											{ flex: zone.flex },
											zone.tone === "light" ? styles.zoneLight : styles.zoneGray,
										]}>
										<Text style={styles.zoneText} numberOfLines={2}>
											{zone.name}
										</Text>
									</View>
								))}
							</View>
						))}
						<View style={styles.entranceRow}>
							<Ionicons name="walk" size={16} color={Colors.textSub} />
							<Text style={styles.entranceText}>入口</Text>
						</View>
					</View>
				</ScrollView>

				<View style={styles.legendCard}>
					<Text style={styles.legendTitle}>凡例</Text>
					<View style={styles.legendRow}>
						<View style={[styles.legendSwatch, styles.zoneLight]} />
						<Text style={styles.legendText}>生鮮・惣菜（通路番号なし）</Text>
					</View>
					<View style={styles.legendRow}>
						<View style={[styles.legendSwatch, styles.zoneGray]} />
						<Text style={styles.legendText}>通路番号のある売場</Text>
					</View>
				</View>

				<View style={styles.hintCard}>
					<Ionicons name="information-circle" size={18} color={Colors.primary} />
					<Text style={styles.hintText}>
						商品ごとの詳しい場所は、商品検索またはバーコード読取から確認してください。
					</Text>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	content: {
		padding: 20,
		paddingBottom: 40,
	},
	storeName: {
		fontSize: 18,
		fontWeight: "800",
		color: Colors.text,
	},
	subtitle: {
		fontSize: 12,
		color: Colors.textMuted,
		marginTop: 4,
		marginBottom: 16,
	},
	mapScroll: {
		marginBottom: 16,
	},
	mapCard: {
		width: "100%",
		minWidth: MAP_MIN_WIDTH,
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 14,
		borderWidth: 1,
		borderColor: Colors.border,
		gap: 8,
	},
	row: {
		flexDirection: "row",
		gap: 8,
	},
	zone: {
		borderRadius: 10,
		paddingVertical: 18,
		paddingHorizontal: 8,
		alignItems: "center",
		justifyContent: "center",
		minHeight: 56,
	},
	zoneLight: {
		backgroundColor: Colors.primaryLight,
	},
	zoneGray: {
		backgroundColor: Colors.grayBg,
	},
	zoneText: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.textSub,
		textAlign: "center",
	},
	entranceRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: Colors.border,
	},
	entranceText: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.textSub,
	},
	legendCard: {
		backgroundColor: Colors.surface,
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		gap: 10,
	},
	legendTitle: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.textSub,
	},
	legendRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	legendSwatch: {
		width: 20,
		height: 20,
		borderRadius: 6,
	},
	legendText: {
		fontSize: 13,
		color: Colors.text,
	},
	hintCard: {
		flexDirection: "row",
		gap: 8,
		backgroundColor: Colors.primaryLight,
		borderRadius: 14,
		padding: 14,
	},
	hintText: {
		flex: 1,
		fontSize: 12,
		color: Colors.text,
		lineHeight: 18,
	},
});

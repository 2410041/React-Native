import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { LocationCard } from "@/components/LocationCard";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Colors } from "@/constants/colors";
import { getProductById } from "@/data/products";

const MAP_MIN_WIDTH = 320;

export default function MapScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const product = getProductById(id);

	if (!product) {
		return <Redirect href="/home" />;
	}

	return (
		<View style={styles.screen}>
			<AppHeader title="商品の場所案内" />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.name}>{product.name}</Text>

				<LocationCard
					title="商品の場所はこちら"
					aisleNumber={product.location.aisleNumber}
					sectionName={product.location.sectionName}
					landmark={product.location.landmark}
				/>

				<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mapScroll}>
					<View style={styles.mapCard}>
						<View style={styles.mapTopRow}>
							<View style={styles.mapZone}>
								<Text style={styles.zoneText}>青果</Text>
							</View>
							<View style={styles.mapZone}>
								<Text style={styles.zoneText}>鮮魚</Text>
							</View>
							<View style={styles.mapZone}>
								<Text style={styles.zoneText}>惣菜</Text>
							</View>
						</View>

						<View style={styles.mapMidRow}>
							<View style={styles.aisleColumn}>
								<View style={styles.aisleCircle}>
									<Text style={styles.aisleCircleText}>{product.location.aisleNumber}</Text>
								</View>
							</View>

							<View style={styles.targetZone}>
								<Text style={styles.zoneText} numberOfLines={1}>
									{product.location.sectionName}
								</Text>
								<View style={styles.pin}>
									<Ionicons name="location" size={26} color={Colors.danger} />
								</View>
							</View>

							<View style={styles.routeArea}>
								{[0, 1, 2, 3].map((i) => (
									<View key={i} style={styles.dot} />
								))}
							</View>

							<View style={styles.registerZone}>
								<Text style={styles.zoneTextVertical}>レジ</Text>
								<Ionicons name="cart" size={18} color={Colors.primary} style={styles.cartIcon} />
							</View>
						</View>

						<View style={styles.mapBottomRow}>
							<Ionicons name="walk" size={16} color={Colors.textSub} />
							<Text style={styles.entranceText}>入口（現在地の目安）</Text>
						</View>
					</View>
				</ScrollView>

				<View style={styles.noteCard}>
					<Text style={styles.noteTitle}>ご案内・メモ</Text>
					{product.guideNotes.map((note) => (
						<View key={note} style={styles.noteRow}>
							<Ionicons name="checkmark-circle" size={16} color={Colors.primary} />
							<Text style={styles.noteText}>{note}</Text>
						</View>
					))}
					{product.location.nearbyProducts.length > 0 && (
						<View style={styles.noteRow}>
							<Ionicons name="cube-outline" size={16} color={Colors.primary} />
							<Text style={styles.noteText}>
								近くの商品：{product.location.nearbyProducts.join("、")}
							</Text>
						</View>
					)}
					{product.location.nearbyFacilities.length > 0 && (
						<View style={styles.noteRow}>
							<Ionicons name="business-outline" size={16} color={Colors.primary} />
							<Text style={styles.noteText}>
								近くの設備：{product.location.nearbyFacilities.join("、")}
							</Text>
						</View>
					)}
				</View>

				<SecondaryButton
					label="店舗全体マップを見る"
					icon="map-outline"
					onPress={() => router.push("/map/store")}
				/>
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
	name: {
		fontSize: 18,
		fontWeight: "800",
		color: Colors.text,
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
	},
	mapTopRow: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 8,
	},
	mapZone: {
		flex: 1,
		backgroundColor: Colors.grayBg,
		borderRadius: 10,
		paddingVertical: 14,
		alignItems: "center",
	},
	zoneText: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.textSub,
	},
	mapMidRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 8,
	},
	aisleColumn: {
		width: 32,
		alignItems: "center",
	},
	aisleCircle: {
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: Colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	aisleCircleText: {
		color: Colors.white,
		fontSize: 13,
		fontWeight: "800",
	},
	targetZone: {
		flex: 2,
		backgroundColor: Colors.primaryLight,
		borderRadius: 10,
		paddingVertical: 30,
		paddingHorizontal: 6,
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	pin: {
		marginTop: 2,
	},
	routeArea: {
		width: 30,
		alignItems: "center",
		justifyContent: "space-between",
		height: 60,
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: Colors.primary,
	},
	registerZone: {
		flex: 1,
		backgroundColor: Colors.grayBg,
		borderRadius: 10,
		paddingVertical: 30,
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
	},
	zoneTextVertical: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.textSub,
	},
	cartIcon: {
		marginTop: 2,
	},
	mapBottomRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
		paddingVertical: 10,
		borderTopWidth: 1,
		borderTopColor: Colors.border,
		marginTop: 4,
	},
	entranceText: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.textSub,
	},
	noteCard: {
		backgroundColor: Colors.primaryLight,
		borderRadius: 16,
		padding: 16,
		marginBottom: 20,
		gap: 8,
	},
	noteTitle: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.primary,
		marginBottom: 4,
	},
	noteRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 8,
	},
	noteText: {
		flex: 1,
		fontSize: 13,
		color: Colors.text,
		lineHeight: 19,
	},
});

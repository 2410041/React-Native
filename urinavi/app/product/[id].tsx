import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { LocationCard } from "@/components/LocationCard";
import { Colors, Gradients } from "@/constants/colors";
import { getProductById } from "@/constants/mockData";
import { StockLevel } from "@/types/product";

function stockColor(level: StockLevel) {
	switch (level) {
		case "あり":
			return Colors.success;
		case "少ない":
			return Colors.warning;
		default:
			return Colors.gray;
	}
}

export default function ProductDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const product = getProductById(id);

	if (!product) {
		return <Redirect href="/search" />;
	}

	return (
		<View style={styles.screen}>
			<AppHeader title="商品結果" />

			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.iconWrap}>
					<Ionicons name="cube" size={56} color={Colors.primary} />
				</View>
				<Text style={styles.name}>{product.name}</Text>

				<LocationCard
					aisleNumber={product.aisleNumber}
					sectionName={product.sectionName}
					landmark={product.landmark}
				/>

				<View style={styles.stockCard}>
					<View style={styles.stockRow}>
						<Text style={styles.stockLabel}>在庫</Text>
						<View
							style={[
								styles.badge,
								{ backgroundColor: stockColor(product.stock) + "22" },
							]}>
							<Text style={[styles.badgeText, { color: stockColor(product.stock) }]}>
								{product.stock}
							</Text>
						</View>
					</View>
					<View style={styles.stockRow}>
						<Text style={styles.stockLabel}>バックヤード在庫</Text>
						<View
							style={[
								styles.badge,
								{ backgroundColor: stockColor(product.backyardStock) + "22" },
							]}>
							<Text
								style={[
									styles.badgeText,
									{ color: stockColor(product.backyardStock) },
								]}>
								{product.backyardStock}
							</Text>
						</View>
					</View>
				</View>

				<TouchableOpacity
					activeOpacity={0.85}
					style={styles.mapButtonWrapper}
					onPress={() => router.push(`/map/${product.id}`)}>
					<LinearGradient
						colors={Gradients.primary}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.mapButton}>
						<Ionicons name="map" size={20} color={Colors.white} />
						<Text style={styles.mapButtonText}>売場マップで確認</Text>
					</LinearGradient>
				</TouchableOpacity>
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
		alignItems: "center",
	},
	iconWrap: {
		width: 96,
		height: 96,
		borderRadius: 48,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 12,
		marginBottom: 14,
	},
	name: {
		fontSize: 20,
		fontWeight: "800",
		color: Colors.text,
		marginBottom: 20,
		textAlign: "center",
	},
	stockCard: {
		width: "100%",
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 18,
		marginBottom: 24,
	},
	stockRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	stockLabel: {
		fontSize: 15,
		color: Colors.textSub,
		fontWeight: "600",
	},
	badge: {
		paddingHorizontal: 14,
		paddingVertical: 5,
		borderRadius: 999,
	},
	badgeText: {
		fontSize: 13,
		fontWeight: "700",
	},
	mapButtonWrapper: {
		width: "100%",
		borderRadius: 16,
		overflow: "hidden",
	},
	mapButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		paddingVertical: 16,
	},
	mapButtonText: {
		color: Colors.white,
		fontSize: 16,
		fontWeight: "700",
	},
});

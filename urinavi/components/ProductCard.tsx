import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Product, StockLevel } from "@/types/product";

type ProductCardProps = {
	product: Product;
	onPress?: () => void;
};

function stockBadgeStyle(level: StockLevel) {
	switch (level) {
		case "あり":
			return { backgroundColor: Colors.successBg, color: Colors.success };
		case "少ない":
			return { backgroundColor: Colors.warningBg, color: Colors.warning };
		case "なし":
		default:
			return { backgroundColor: Colors.grayBg, color: Colors.gray };
	}
}

function StockBadge({ label, level }: { label: string; level: StockLevel }) {
	const badge = stockBadgeStyle(level);
	return (
		<View style={styles.stockRow}>
			<Text style={styles.stockLabel}>{label}</Text>
			<View style={[styles.badge, { backgroundColor: badge.backgroundColor }]}>
				<Text style={[styles.badgeText, { color: badge.color }]}>{level}</Text>
			</View>
		</View>
	);
}

export function ProductCard({ product, onPress }: ProductCardProps) {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
			<View style={styles.headerRow}>
				<View style={styles.iconCircle}>
					<Ionicons name="cube" size={22} color={Colors.primary} />
				</View>
				<Text style={styles.name} numberOfLines={2}>
					{product.name}
				</Text>
			</View>

			<View style={styles.infoRow}>
				<Ionicons name="location-outline" size={15} color={Colors.textSub} />
				<Text style={styles.infoText}>通路番号：{product.aisleNumber}</Text>
			</View>
			<View style={styles.infoRow}>
				<Ionicons name="storefront-outline" size={15} color={Colors.textSub} />
				<Text style={styles.infoText}>売場名：{product.sectionName}</Text>
			</View>
			<View style={styles.infoRow}>
				<Ionicons name="snow-outline" size={15} color={Colors.textSub} />
				<Text style={styles.infoText}>目印：{product.landmark}</Text>
			</View>

			<View style={styles.divider} />

			<StockBadge label="在庫" level={product.stock} />
			<StockBadge label="バックヤード在庫" level={product.backyardStock} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 16,
		marginBottom: 14,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },
		elevation: 1,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		gap: 10,
	},
	iconCircle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
	},
	name: {
		flex: 1,
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginBottom: 6,
	},
	infoText: {
		fontSize: 13,
		color: Colors.textSub,
	},
	divider: {
		height: 1,
		backgroundColor: Colors.border,
		marginVertical: 8,
	},
	stockRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 6,
	},
	stockLabel: {
		fontSize: 13,
		color: Colors.textSub,
	},
	badge: {
		paddingHorizontal: 10,
		paddingVertical: 3,
		borderRadius: 999,
	},
	badgeText: {
		fontSize: 12,
		fontWeight: "700",
	},
});

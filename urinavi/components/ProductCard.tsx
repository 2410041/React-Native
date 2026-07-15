import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { StatusBadge } from "@/components/StatusBadge";
import { getHandlingStatusMeta, getStockStatusMeta } from "@/components/statusMeta";
import { Colors } from "@/constants/colors";
import { getDepartmentName } from "@/data/departments";
import { Product } from "@/types/product";

type ProductCardProps = {
	product: Product;
	onPress?: () => void;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
	const stockMeta = getStockStatusMeta(product.stock);
	const handlingMeta = getHandlingStatusMeta(product.handlingStatus);

	return (
		<TouchableOpacity
			style={styles.card}
			onPress={onPress}
			activeOpacity={0.7}
			accessibilityRole="button"
			accessibilityLabel={`${product.name}の詳細を見る`}>
			<View style={styles.headerRow}>
				<View style={styles.iconCircle}>
					<Ionicons name="cube" size={22} color={Colors.primary} />
				</View>
				<View style={styles.headerText}>
					<Text style={styles.name} numberOfLines={2}>
						{product.name}
					</Text>
					<Text style={styles.department}>{getDepartmentName(product.departmentCode)}</Text>
				</View>
			</View>

			<View style={styles.infoRow}>
				<Ionicons name="location-outline" size={15} color={Colors.textSub} />
				<Text style={styles.infoText}>通路番号：{product.location.aisleNumber}</Text>
			</View>
			<View style={styles.infoRow}>
				<Ionicons name="storefront-outline" size={15} color={Colors.textSub} />
				<Text style={styles.infoText} numberOfLines={1}>
					売場名：{product.location.sectionName}
				</Text>
			</View>
			<View style={styles.infoRow}>
				<Ionicons name="flag-outline" size={15} color={Colors.textSub} />
				<Text style={styles.infoText} numberOfLines={1}>
					目印：{product.location.landmark}
				</Text>
			</View>

			<View style={styles.divider} />

			<View style={styles.badgeRow}>
				<StatusBadge meta={handlingMeta} size="small" />
				<StatusBadge meta={stockMeta} size="small" />
			</View>
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
	headerText: {
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
	},
	department: {
		fontSize: 12,
		color: Colors.textMuted,
		marginTop: 2,
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginBottom: 6,
	},
	infoText: {
		flex: 1,
		fontSize: 13,
		color: Colors.textSub,
	},
	divider: {
		height: 1,
		backgroundColor: Colors.border,
		marginVertical: 8,
	},
	badgeRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
});

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { StatusBadge } from "@/components/StatusBadge";
import {
	getHandlingStatusMeta,
	getPriceRevisionCheckStateMeta,
	getStockStatusMeta,
} from "@/components/statusMeta";
import { Colors } from "@/constants/colors";
import { getDepartmentByCode } from "@/data/departments";
import { PriceRevisionItem } from "@/types/priceRevision";

type PriceRevisionCardProps = {
	item: PriceRevisionItem;
	onPress?: () => void;
};

export function PriceRevisionCard({ item, onPress }: PriceRevisionCardProps) {
	const handlingMeta = getHandlingStatusMeta(item.handlingStatus);
	const stockMeta = getStockStatusMeta(item.stockStatus);
	const checkMeta = getPriceRevisionCheckStateMeta(item.checkState);
	const department = getDepartmentByCode(item.departmentCode);

	return (
		<TouchableOpacity style={styles.card} activeOpacity={0.75} onPress={onPress}>
			<View style={styles.iconCircle}>
				<Ionicons name={item.imageIcon as keyof typeof Ionicons.glyphMap} size={24} color={Colors.primary} />
			</View>
			<View style={styles.body}>
				<Text style={styles.name} numberOfLines={2}>
					{item.name}
				</Text>
				<Text style={styles.jan}>JAN：{item.janCode}</Text>
				<Text style={styles.department}>
					{department.name}（部門コード：{department.internalCode}）
				</Text>
				<View style={styles.badgeRow}>
					<StatusBadge meta={handlingMeta} size="small" />
					<StatusBadge meta={stockMeta} size="small" />
					<StatusBadge meta={checkMeta} size="small" />
				</View>
			</View>
			<Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		backgroundColor: Colors.surface,
		borderRadius: 16,
		padding: 14,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	iconCircle: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
	},
	body: {
		flex: 1,
		gap: 4,
	},
	name: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.text,
	},
	jan: {
		fontSize: 12,
		color: Colors.textMuted,
	},
	department: {
		fontSize: 12,
		color: Colors.textSub,
		fontWeight: "600",
	},
	badgeRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
		marginTop: 4,
	},
});

import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { StatusBadge } from "@/components/StatusBadge";
import {
	getHandlingStatusMeta,
	getPriceRevisionCheckStateMeta,
	getStockStatusMeta,
} from "@/components/statusMeta";
import { SuccessMessage } from "@/components/SuccessMessage";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { getDepartmentByCode } from "@/data/departments";

export default function PriceRevisionDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { priceRevision, togglePriceRevisionCheckState } = useApp();
	const item = priceRevision.items.find((i) => i.id === id);

	if (!item) {
		return <Redirect href="/price-revision/result" />;
	}

	const handlingMeta = getHandlingStatusMeta(item.handlingStatus);
	const stockMeta = getStockStatusMeta(item.stockStatus);
	const checkMeta = getPriceRevisionCheckStateMeta(item.checkState);
	const department = getDepartmentByCode(item.departmentCode);

	return (
		<View style={styles.screen}>
			<AppHeader title="価格改定商品詳細" />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.iconWrap}>
					<Ionicons name={item.imageIcon as keyof typeof Ionicons.glyphMap} size={48} color={Colors.primary} />
				</View>
				<Text style={styles.name}>{item.name}</Text>
				<Text style={styles.jan}>JANコード：{item.janCode}</Text>
				<Text style={styles.department}>
					{department.name}（部門コード：{department.internalCode}）
				</Text>

				<View style={styles.card}>
					<View style={styles.row}>
						<Text style={styles.rowLabel}>取扱い状態</Text>
						<StatusBadge meta={handlingMeta} />
					</View>
					<View style={styles.row}>
						<Text style={styles.rowLabel}>在庫状態</Text>
						<StatusBadge meta={stockMeta} />
					</View>
					<View style={styles.row}>
						<Text style={styles.rowLabel}>確認状態</Text>
						<StatusBadge meta={checkMeta} />
					</View>
				</View>

				{item.checkState === "確認済み" && <SuccessMessage message="確認済みとして記録されています" />}

				<View style={styles.actionWrap}>
					<PrimaryButton
						label={item.checkState === "確認済み" ? "未確認に戻す" : "確認済みにする"}
						icon={item.checkState === "確認済み" ? "refresh" : "checkmark-done"}
						onPress={() => togglePriceRevisionCheckState(item.id)}
					/>
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
		alignItems: "center",
	},
	iconWrap: {
		width: 88,
		height: 88,
		borderRadius: 44,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 14,
	},
	name: {
		fontSize: 19,
		fontWeight: "800",
		color: Colors.text,
		textAlign: "center",
	},
	jan: {
		fontSize: 12,
		color: Colors.textMuted,
		marginTop: 6,
	},
	department: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.textSub,
		marginTop: 4,
		marginBottom: 20,
	},
	card: {
		width: "100%",
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 18,
		marginBottom: 16,
		gap: 14,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	rowLabel: {
		fontSize: 14,
		fontWeight: "600",
		color: Colors.textSub,
	},
	actionWrap: {
		width: "100%",
		marginTop: 16,
	},
});

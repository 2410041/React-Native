import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { LocationCard } from "@/components/LocationCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { StatusBadge } from "@/components/StatusBadge";
import { getHandlingStatusMeta, getStockStatusMeta } from "@/components/statusMeta";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { getDepartmentName } from "@/data/departments";
import { getProductById } from "@/data/products";

function formatDateTime(iso: string): string {
	const date = new Date(iso);
	return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${String(
		date.getHours()
	).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export default function ProductDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const product = getProductById(id);
	const { addHistory } = useApp();

	useEffect(() => {
		if (product) {
			addHistory(product.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product?.id]);

	if (!product) {
		return <Redirect href="/search" />;
	}

	const stockMeta = getStockStatusMeta(product.stock);
	const backyardMeta = getStockStatusMeta(product.backyardStock);
	const handlingMeta = getHandlingStatusMeta(product.handlingStatus);

	return (
		<View style={styles.screen}>
			<AppHeader title="商品詳細" subtitle={getDepartmentName(product.departmentCode)} />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.iconWrap}>
					<Ionicons name="cube" size={56} color={Colors.primary} />
				</View>
				<Text style={styles.name}>{product.name}</Text>
				<Text style={styles.jan}>JANコード：{product.janCode}</Text>
				<Text style={styles.department}>{getDepartmentName(product.departmentCode)}</Text>

				<View style={styles.statusRow}>
					<StatusBadge meta={handlingMeta} />
				</View>

				<LocationCard
					title="商品がおいている場所"
					aisleNumber={product.location.aisleNumber}
					sectionName={product.location.sectionName}
					landmark={product.location.landmark}
				/>

				<View style={styles.stockCard}>
					<View style={styles.stockRow}>
						<Text style={styles.stockLabel}>在庫</Text>
						<StatusBadge meta={stockMeta} />
					</View>
					<View style={styles.stockRow}>
						<Text style={styles.stockLabel}>バックヤード在庫</Text>
						<StatusBadge meta={backyardMeta} />
					</View>
					<View style={styles.divider} />
					<View style={styles.stockRow}>
						<Text style={styles.updatedLabel}>最終更新日時</Text>
						<Text style={styles.updatedValue}>{formatDateTime(product.updatedAt)}</Text>
					</View>
				</View>

				<PrimaryButton
					label="売場マップで確認"
					icon="map"
					onPress={() => router.push(`/map/${product.id}`)}
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
	},
	statusRow: {
		marginTop: 12,
		marginBottom: 20,
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
	divider: {
		height: 1,
		backgroundColor: Colors.border,
		marginBottom: 12,
	},
	updatedLabel: {
		fontSize: 13,
		color: Colors.textMuted,
	},
	updatedValue: {
		fontSize: 13,
		color: Colors.textSub,
		fontWeight: "600",
	},
});

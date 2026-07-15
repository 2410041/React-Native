import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "@/components/BottomNav";
import { ConfirmModal } from "@/components/ConfirmModal";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { Colors, Gradients } from "@/constants/colors";
import { useApp, useRecentProducts } from "@/context/AppContext";

export default function HistoryScreen() {
	const { clearHistory } = useApp();
	const recentProducts = useRecentProducts();
	const [confirmVisible, setConfirmVisible] = useState(false);

	return (
		<View style={styles.screen}>
			<LinearGradient colors={Gradients.header} style={styles.header}>
				<SafeAreaView edges={["top"]}>
					<View style={styles.headerRow}>
						<Text style={styles.headerTitle}>最近見た商品</Text>
						{recentProducts.length > 0 && (
							<TouchableOpacity
								onPress={() => setConfirmVisible(true)}
								hitSlop={10}
								accessibilityRole="button"
								accessibilityLabel="履歴をすべて削除">
								<Text style={styles.clearText}>すべて削除</Text>
							</TouchableOpacity>
						)}
					</View>
				</SafeAreaView>
			</LinearGradient>

			<FlatList
				data={recentProducts}
				keyExtractor={(item) => item.entry.productId}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<ProductCard
						product={item.product}
						onPress={() => router.push(`/product/${item.product.id}`)}
					/>
				)}
				ListEmptyComponent={
					<EmptyState
						icon="time-outline"
						title="閲覧履歴はまだありません"
						message="商品検索やバーコード読取で商品を確認すると、ここに表示されます"
					/>
				}
			/>

			<ConfirmModal
				visible={confirmVisible}
				title="履歴をすべて削除しますか？"
				message="最近見た商品の履歴がすべて削除されます。この操作は取り消せません。"
				confirmLabel="削除する"
				destructive
				onConfirm={() => {
					clearHistory();
					setConfirmVisible(false);
				}}
				onCancel={() => setConfirmVisible(false)}
			/>

			<BottomNav active="history" />
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
		paddingBottom: 20,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 22,
		paddingTop: 16,
	},
	headerTitle: {
		color: Colors.white,
		fontSize: 22,
		fontWeight: "800",
	},
	clearText: {
		color: Colors.white,
		fontSize: 13,
		fontWeight: "700",
		textDecorationLine: "underline",
	},
	list: {
		padding: 20,
		paddingBottom: 40,
		flexGrow: 1,
	},
});

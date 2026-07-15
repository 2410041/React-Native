import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { ConfirmModal } from "@/components/ConfirmModal";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { Colors } from "@/constants/colors";
import { useApp, useRecentProducts } from "@/context/AppContext";

export default function HistoryScreen() {
	const { clearHistory } = useApp();
	const recentProducts = useRecentProducts();
	const [confirmVisible, setConfirmVisible] = useState(false);

	return (
		<View style={styles.screen}>
			<AppHeader
				title="最近見た商品"
				subtitle={recentProducts.length > 0 ? `${recentProducts.length}件` : undefined}
				showBack={false}
				rightIcon={recentProducts.length > 0 ? "trash-outline" : undefined}
				onRightPress={() => setConfirmVisible(true)}
				rightAccessibilityLabel="履歴をすべて削除"
			/>

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
	list: {
		padding: 20,
		paddingBottom: 40,
		flexGrow: 1,
	},
});

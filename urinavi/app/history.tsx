import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { Colors, Gradients } from "@/constants/colors";
import { mockEmployee, mockProducts } from "@/constants/mockData";

export default function HistoryScreen() {
	const recentProducts = mockProducts.filter(
		(p) => p.storeId === mockEmployee.storeId
	);

	return (
		<View style={styles.screen}>
			<LinearGradient colors={Gradients.header} style={styles.header}>
				<SafeAreaView edges={["top"]}>
					<Text style={styles.headerTitle}>履歴</Text>
				</SafeAreaView>
			</LinearGradient>

			<FlatList
				data={recentProducts}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<ProductCard
						product={item}
						onPress={() => router.push(`/product/${item.id}`)}
					/>
				)}
				ListHeaderComponent={<Text style={styles.listTitle}>最近見た商品</Text>}
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
	headerTitle: {
		color: Colors.white,
		fontSize: 22,
		fontWeight: "800",
		paddingHorizontal: 22,
		paddingTop: 16,
	},
	list: {
		padding: 20,
		paddingBottom: 40,
	},
	listTitle: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.textSub,
		marginBottom: 12,
	},
});

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { ProductCard } from "@/components/ProductCard";
import { Colors } from "@/constants/colors";
import { mockEmployee, searchProducts } from "@/constants/mockData";

export default function SearchScreen() {
	const [keyword, setKeyword] = useState("");

	const results = useMemo(
		() => searchProducts(keyword, mockEmployee.storeId),
		[keyword]
	);

	return (
		<View style={styles.screen}>
			<AppHeader title="商品検索" />

			<View style={styles.searchBox}>
				<Ionicons name="search" size={18} color={Colors.textMuted} />
				<TextInput
					style={styles.input}
					placeholder="商品名を入力"
					placeholderTextColor={Colors.textMuted}
					value={keyword}
					onChangeText={setKeyword}
				/>
			</View>

			<FlatList
				data={results}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<ProductCard
						product={item}
						onPress={() => router.push(`/product/${item.id}`)}
					/>
				)}
				ListEmptyComponent={
					<Text style={styles.empty}>該当する商品が見つかりません</Text>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	searchBox: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.surface,
		marginHorizontal: 20,
		marginTop: 16,
		marginBottom: 8,
		borderRadius: 14,
		paddingHorizontal: 14,
		gap: 8,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	input: {
		flex: 1,
		paddingVertical: 12,
		fontSize: 16,
		color: Colors.text,
	},
	list: {
		paddingHorizontal: 20,
		paddingTop: 8,
		paddingBottom: 40,
	},
	empty: {
		textAlign: "center",
		color: Colors.textMuted,
		marginTop: 40,
		fontSize: 14,
	},
});

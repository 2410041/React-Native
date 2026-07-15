import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { BackHandler, FlatList, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { DepartmentSelector, SelectedDepartment } from "@/components/DepartmentSelector";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { ProductCard } from "@/components/ProductCard";
import { SearchInput } from "@/components/SearchInput";
import { SectionTitle } from "@/components/SectionTitle";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { frequentProductIds } from "@/data/searchHistory";
import { getProductById, searchProducts } from "@/data/products";

type SearchMode = "name" | "jan";

export default function SearchScreen() {
	const { store, searchHistory, addSearchHistory, clearSearchHistory } = useApp();
	const [mode, setMode] = useState<SearchMode>("name");
	const [keyword, setKeyword] = useState("");
	const [department, setDepartment] = useState<SelectedDepartment>("all");
	const [isSearching, setIsSearching] = useState(false);

	const trimmed = keyword.trim();
	const isErrorDemo = trimmed.toLowerCase() === "error";

	useEffect(() => {
		if (!trimmed) {
			setIsSearching(false);
			return;
		}
		setIsSearching(true);
		const timer = setTimeout(() => setIsSearching(false), 350);
		return () => clearTimeout(timer);
	}, [trimmed]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			if (Keyboard.isVisible()) {
				Keyboard.dismiss();
				return true;
			}
			return false;
		});
		return () => sub.remove();
	}, []);

	const results = useMemo(() => {
		if (!store || !trimmed || isErrorDemo) return [];
		return searchProducts(trimmed, store.id, department);
	}, [store, trimmed, department, isErrorDemo]);

	const frequentProducts = frequentProductIds
		.map((id) => getProductById(id))
		.filter((p): p is NonNullable<typeof p> => Boolean(p));

	function handleSubmit() {
		if (!trimmed || isErrorDemo) return;
		addSearchHistory(trimmed);
	}

	function handleSelectKeyword(value: string) {
		setKeyword(value);
		setMode(/^\d+$/.test(value) ? "jan" : "name");
	}

	return (
		<View style={styles.screen}>
			<AppHeader title="商品検索" subtitle="商品名・JANコードから探す" showBack={false} />

			<View style={styles.searchArea}>
				<View style={styles.modeRow}>
					<TouchableOpacity
						style={[styles.modeChip, mode === "name" && styles.modeChipActive]}
						onPress={() => setMode("name")}
						accessibilityRole="button"
						accessibilityLabel="商品名で検索">
						<Text style={[styles.modeChipText, mode === "name" && styles.modeChipTextActive]}>
							商品名で検索
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.modeChip, mode === "jan" && styles.modeChipActive]}
						onPress={() => setMode("jan")}
						accessibilityRole="button"
						accessibilityLabel="JANコードで検索">
						<Text style={[styles.modeChipText, mode === "jan" && styles.modeChipTextActive]}>
							JANコードで検索
						</Text>
					</TouchableOpacity>
				</View>

				<SearchInput
					value={keyword}
					onChangeText={setKeyword}
					onSubmitEditing={handleSubmit}
					placeholder={mode === "jan" ? "JANコードを入力" : "商品名を入力"}
					keyboardType={mode === "jan" ? "number-pad" : "default"}
					returnKeyType="search"
					accessibilityLabel={mode === "jan" ? "JANコード入力欄" : "商品名入力欄"}
				/>

				<View style={styles.filterArea}>
					<DepartmentSelector value={department} onChange={setDepartment} variant="chips" />
				</View>
			</View>

			{!trimmed ? (
				<ScrollView contentContainerStyle={styles.list} keyboardShouldPersistTaps="handled">
					{searchHistory.length > 0 && (
						<View style={styles.section}>
							<SectionTitle
								title="検索履歴"
								actionLabel="すべて削除"
								onActionPress={clearSearchHistory}
							/>
							<View style={styles.chipWrap}>
								{searchHistory.map((h) => (
									<TouchableOpacity
										key={h}
										style={styles.historyChip}
										onPress={() => handleSelectKeyword(h)}
										accessibilityRole="button"
										accessibilityLabel={`${h}で検索`}>
										<Text style={styles.historyChipText}>{h}</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>
					)}

					{frequentProducts.length > 0 && (
						<View style={styles.section}>
							<SectionTitle title="よく検索する商品" />
							<View style={styles.chipWrap}>
								{frequentProducts.map((p) => (
									<TouchableOpacity
										key={p.id}
										style={styles.historyChip}
										onPress={() => handleSelectKeyword(p.name)}
										accessibilityRole="button"
										accessibilityLabel={`${p.name}で検索`}>
										<Text style={styles.historyChipText}>{p.name}</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>
					)}

					<EmptyState
						icon="search-outline"
						title="商品名またはJANコードで検索してください"
						message="部門を絞り込むこともできます"
					/>
				</ScrollView>
			) : isErrorDemo ? (
				<ErrorState
					variant="error"
					onRetry={() => setKeyword("")}
					message='「error」は検索エラーの表示確認用キーワードです'
				/>
			) : isSearching ? (
				<LoadingState message="検索しています…" />
			) : (
				<FlatList
					data={results}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.list}
					keyboardShouldPersistTaps="handled"
					renderItem={({ item }) => (
						<ProductCard product={item} onPress={() => router.push(`/product/${item.id}`)} />
					)}
					ListEmptyComponent={
						<EmptyState
							icon="alert-circle-outline"
							title="該当する商品が見つかりません"
							message="キーワードや部門の絞り込みを変えてお試しください"
						/>
					}
				/>
			)}

			<BottomNav active="search" />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	searchArea: {
		paddingHorizontal: 20,
		paddingTop: 16,
		gap: 10,
	},
	modeRow: {
		flexDirection: "row",
		gap: 8,
	},
	modeChip: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 999,
		backgroundColor: Colors.grayBg,
		minHeight: 36,
		justifyContent: "center",
	},
	modeChipActive: {
		backgroundColor: Colors.primaryLight,
	},
	modeChipText: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.textSub,
	},
	modeChipTextActive: {
		color: Colors.primary,
	},
	filterArea: {
		marginTop: 2,
	},
	list: {
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 40,
	},
	section: {
		marginBottom: 20,
	},
	chipWrap: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	historyChip: {
		paddingHorizontal: 14,
		paddingVertical: 9,
		borderRadius: 999,
		backgroundColor: Colors.surface,
		borderWidth: 1,
		borderColor: Colors.border,
		minHeight: 40,
		justifyContent: "center",
	},
	historyChipText: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.textSub,
	},
});

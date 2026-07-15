import { Redirect, router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { DepartmentSelector, SelectedDepartment } from "@/components/DepartmentSelector";
import { EmptyState } from "@/components/EmptyState";
import { PriceRevisionCard } from "@/components/PriceRevisionCard";
import { SearchInput } from "@/components/SearchInput";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { PriceRevisionItem, PriceRevisionTab } from "@/types/priceRevision";

const tabOptions: { key: PriceRevisionTab; label: string }[] = [
	{ key: "all", label: "すべて" },
	{ key: "handled", label: "取扱いあり" },
	{ key: "inStock", label: "在庫あり" },
	{ key: "outOfStock", label: "在庫なし" },
	{ key: "unconfirmed", label: "未確認" },
	{ key: "notHandled", label: "取扱いなし" },
];

function matchesTab(item: PriceRevisionItem, tab: PriceRevisionTab): boolean {
	switch (tab) {
		case "handled":
			return item.handlingStatus === "取扱いあり";
		case "inStock":
			return item.stockStatus === "あり";
		case "outOfStock":
			return item.stockStatus === "なし";
		case "unconfirmed":
			return item.stockStatus === "未確認" || item.handlingStatus === "不明";
		case "notHandled":
			return item.handlingStatus === "取扱いなし";
		case "all":
		default:
			return true;
	}
}

export default function PriceRevisionResultScreen() {
	const { priceRevision } = useApp();
	const [tab, setTab] = useState<PriceRevisionTab>("all");
	const [department, setDepartment] = useState<SelectedDepartment>("all");
	const [keyword, setKeyword] = useState("");

	const filtered = useMemo(() => {
		const trimmed = keyword.trim();
		return priceRevision.items.filter((item) => {
			if (!matchesTab(item, tab)) return false;
			if (department !== "all" && item.departmentCode !== department) return false;
			if (!trimmed) return true;
			if (/^\d+$/.test(trimmed)) return item.janCode.includes(trimmed);
			return item.name.includes(trimmed);
		});
	}, [priceRevision.items, tab, department, keyword]);

	if (priceRevision.status !== "result" && priceRevision.items.length === 0) {
		return <Redirect href="/price-revision" />;
	}

	return (
		<View style={styles.screen}>
			<AppHeader title="照合結果" />

			<View style={styles.filterArea}>
				<SearchInput
					value={keyword}
					onChangeText={setKeyword}
					placeholder="商品名またはJANコードで絞り込み"
					accessibilityLabel="商品名またはJANコードで絞り込み"
				/>
				<View style={styles.departmentFilterWrap}>
					<DepartmentSelector value={department} onChange={setDepartment} variant="chips" />
				</View>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.tabRow}>
					{tabOptions.map((option) => {
						const isActive = option.key === tab;
						return (
							<TouchableOpacity
								key={option.key}
								style={[styles.tab, isActive && styles.tabActive]}
								onPress={() => setTab(option.key)}
								accessibilityRole="button"
								accessibilityState={{ selected: isActive }}
								accessibilityLabel={option.label}>
								<Text style={[styles.tabText, isActive && styles.tabTextActive]}>
									{option.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>

			<FlatList
				data={filtered}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<PriceRevisionCard
						item={item}
						onPress={() => router.push(`/price-revision/${item.id}`)}
					/>
				)}
				ListEmptyComponent={
					<EmptyState
						icon="pricetags-outline"
						title="該当する商品がありません"
						message="タブや絞り込み条件を変えてお試しください"
					/>
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
	filterArea: {
		paddingHorizontal: 20,
		paddingTop: 14,
		gap: 10,
	},
	departmentFilterWrap: {
		marginTop: 2,
	},
	tabRow: {
		gap: 8,
		paddingVertical: 4,
	},
	tab: {
		paddingHorizontal: 14,
		paddingVertical: 9,
		borderRadius: 999,
		backgroundColor: Colors.grayBg,
		minHeight: 40,
		justifyContent: "center",
	},
	tabActive: {
		backgroundColor: Colors.primary,
	},
	tabText: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.textSub,
	},
	tabTextActive: {
		color: Colors.white,
	},
	list: {
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 40,
		flexGrow: 1,
	},
});

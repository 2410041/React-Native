import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Colors } from "@/constants/colors";

type HelpSection = {
	id: string;
	title: string;
	body: string;
};

const helpSections: HelpSection[] = [
	{
		id: "search",
		title: "商品検索の使い方",
		body: "ホーム画面の「商品検索」から、商品名またはJANコードで検索できます。部門で絞り込むと、担当売場の商品だけを素早く探せます。",
	},
	{
		id: "barcode",
		title: "バーコード読取の使い方",
		body: "「バーコード読取」で商品のバーコードを枠内に合わせると、商品情報がすぐに確認できます。品出しや売場戻しの際にご利用ください。",
	},
	{
		id: "map",
		title: "売場マップの見方",
		body: "商品詳細から「売場マップで確認」を押すと、通路番号・売場名・目印をもとにした売場の位置が表示されます。棚番のない店舗を前提にしています。",
	},
	{
		id: "priceRevision",
		title: "価格改定チェックの使い方",
		body: "「価格改定チェック」で対象リストを取り込むと、店舗の取扱い状況・在庫状況と自動で照合されます。タブで取扱いあり・在庫なしなどに絞り込めます。",
	},
	{
		id: "faq",
		title: "よくある質問",
		body: "Q. 担当外の部門の商品も検索できますか？\nA. 「すべての部門」に切り替えると、担当外の商品も検索できます。\n\nQ. 責番を忘れてしまいました。\nA. 店舗の管理者・店長へお問い合わせください。",
	},
];

export default function HelpScreen() {
	const [expandedId, setExpandedId] = useState<string | null>("search");

	return (
		<View style={styles.screen}>
			<AppHeader title="ヘルプ" />

			<ScreenContainer scroll>
				{helpSections.map((section) => {
					const isExpanded = expandedId === section.id;
					return (
						<View key={section.id} style={styles.card}>
							<TouchableOpacity
								style={styles.cardHeader}
								activeOpacity={0.7}
								onPress={() => setExpandedId(isExpanded ? null : section.id)}
								accessibilityRole="button"
								accessibilityState={{ expanded: isExpanded }}
								accessibilityLabel={section.title}>
								<Text style={styles.cardTitle}>{section.title}</Text>
								<Ionicons
									name={isExpanded ? "chevron-up" : "chevron-down"}
									size={18}
									color={Colors.textMuted}
								/>
							</TouchableOpacity>
							{isExpanded && <Text style={styles.cardBody}>{section.body}</Text>}
						</View>
					);
				})}

				<View style={styles.contactCard}>
					<Ionicons name="call-outline" size={22} color={Colors.primary} />
					<Text style={styles.contactTitle}>問い合わせ案内</Text>
					<Text style={styles.contactText}>
						アプリの操作でお困りの場合は、店舗の管理者または本部システム担当までご連絡ください。
					</Text>
				</View>
			</ScreenContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	card: {
		backgroundColor: Colors.surface,
		borderRadius: 16,
		padding: 16,
		marginBottom: 12,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 10,
		minHeight: 32,
	},
	cardTitle: {
		flex: 1,
		fontSize: 15,
		fontWeight: "700",
		color: Colors.text,
	},
	cardBody: {
		fontSize: 13,
		color: Colors.textSub,
		lineHeight: 20,
		marginTop: 12,
	},
	contactCard: {
		backgroundColor: Colors.primaryLight,
		borderRadius: 16,
		padding: 18,
		alignItems: "center",
		gap: 6,
		marginTop: 8,
	},
	contactTitle: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.primary,
	},
	contactText: {
		fontSize: 13,
		color: Colors.text,
		textAlign: "center",
		lineHeight: 19,
	},
});

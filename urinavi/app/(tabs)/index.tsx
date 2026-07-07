import { useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const popularItems = ["牛乳", "卵", "ラップ", "洗剤", "お菓子", "ティッシュ"];

export default function HomeScreen() {
	const [keyword, setKeyword] = useState("");

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.header}>
					<Text style={styles.logo}>Urinavi</Text>
					<Text style={styles.subTitle}>売り場をすばやく案内します</Text>
				</View>

				<View style={styles.searchBox}>
					<Text style={styles.sectionTitle}>商品を検索</Text>

					<TextInput
						style={styles.input}
						placeholder="商品名・キーワードを入力"
						value={keyword}
						onChangeText={setKeyword}
					/>

					<TouchableOpacity style={styles.searchButton}>
						<Text style={styles.searchButtonText}>検索する</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.card}>
					<Text style={styles.sectionTitle}>よく探される商品</Text>

					<View style={styles.chipArea}>
						{popularItems.map((item) => (
							<TouchableOpacity key={item} style={styles.chip}>
								<Text style={styles.chipText}>{item}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<TouchableOpacity style={styles.mapCard}>
					<View>
						<Text style={styles.mapTitle}>店内マップを見る</Text>
						<Text style={styles.mapText}>
							通路番号・売場名・目印から場所を確認できます
						</Text>
					</View>
					<Text style={styles.arrow}>›</Text>
				</TouchableOpacity>

				<View style={styles.notice}>
					<Text style={styles.noticeTitle}>売り場にない商品について</Text>
					<Text style={styles.noticeText}>
						商品によっては季節限定・在庫切れ・取り扱い終了の場合があります。
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#F2FAF5",
	},
	container: {
		padding: 20,
		paddingBottom: 40,
	},
	header: {
		marginTop: 20,
		marginBottom: 24,
	},
	logo: {
		fontSize: 36,
		fontWeight: "800",
		color: "#15803D",
	},
	subTitle: {
		marginTop: 8,
		fontSize: 15,
		color: "#4B5563",
	},
	searchBox: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		padding: 18,
		marginBottom: 18,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 10,
		elevation: 3,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#111827",
		marginBottom: 12,
	},
	input: {
		backgroundColor: "#F3F4F6",
		borderRadius: 14,
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 16,
		marginBottom: 12,
	},
	searchButton: {
		backgroundColor: "#16A34A",
		borderRadius: 14,
		paddingVertical: 14,
		alignItems: "center",
	},
	searchButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "700",
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		padding: 18,
		marginBottom: 18,
	},
	chipArea: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
	chip: {
		backgroundColor: "#DCFCE7",
		paddingHorizontal: 14,
		paddingVertical: 9,
		borderRadius: 999,
	},
	chipText: {
		color: "#166534",
		fontWeight: "600",
	},
	mapCard: {
		backgroundColor: "#14532D",
		borderRadius: 20,
		padding: 18,
		marginBottom: 18,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	mapTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#FFFFFF",
		marginBottom: 6,
	},
	mapText: {
		color: "#DCFCE7",
		fontSize: 13,
		lineHeight: 20,
		maxWidth: 250,
	},
	arrow: {
		color: "#FFFFFF",
		fontSize: 36,
	},
	notice: {
		backgroundColor: "#ECFDF5",
		borderRadius: 16,
		padding: 16,
		borderWidth: 1,
		borderColor: "#BBF7D0",
	},
	noticeTitle: {
		fontWeight: "700",
		color: "#166534",
		marginBottom: 6,
	},
	noticeText: {
		color: "#374151",
		lineHeight: 20,
	},
});
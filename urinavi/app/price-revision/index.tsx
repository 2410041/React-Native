import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";

export default function PriceRevisionStartScreen() {
	const { priceRevision, selectPriceRevisionFile, startPriceRevisionCheck, simulatePriceRevisionError, resetPriceRevisionCheck } =
		useApp();

	useEffect(() => {
		if (priceRevision.status === "result") {
			router.replace("/price-revision/result");
		}
	}, [priceRevision.status]);

	return (
		<View style={styles.screen}>
			<AppHeader title="価格改定チェック" />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				{priceRevision.status === "idle" && (
					<>
						<View style={styles.introCard}>
							<Ionicons name="pricetags" size={40} color={Colors.primary} />
							<Text style={styles.introTitle}>価格改定リストを取り込む</Text>
							<Text style={styles.introText}>
								価格改定対象の商品リスト（PDF・Excel・CSVを想定）を選択すると、店舗で取り扱いのある商品を自動で照合します。
							</Text>
						</View>
						<PrimaryButton label="ファイルを選択する" icon="document-attach" onPress={selectPriceRevisionFile} />
					</>
				)}

				{priceRevision.status === "selected" && (
					<>
						<View style={styles.fileCard}>
							<View style={styles.fileIconWrap}>
								<Ionicons name="document-text" size={28} color={Colors.primary} />
							</View>
							<View style={styles.fileTextArea}>
								<Text style={styles.fileName} numberOfLines={2}>
									{priceRevision.fileName}
								</Text>
								<Text style={styles.fileMeta}>{priceRevision.itemCount}件の対象商品</Text>
							</View>
						</View>
						<View style={styles.buttonGap}>
							<PrimaryButton label="照合を開始する" icon="checkmark-done" onPress={startPriceRevisionCheck} />
						</View>
						<View style={styles.buttonGap}>
							<SecondaryButton label="ファイルを選び直す" icon="refresh" onPress={resetPriceRevisionCheck} />
						</View>
						<View style={styles.debugLinkWrap}>
							<SecondaryButton
								label="テスト用：読み込みエラーを確認"
								icon="warning-outline"
								onPress={simulatePriceRevisionError}
							/>
						</View>
					</>
				)}

				{priceRevision.status === "loading" && <LoadingState message="店舗の商品と照合しています…" />}

				{priceRevision.status === "error" && (
					<ErrorState
						variant="error"
						title="読み込みに失敗しました"
						message="ファイルの読み込み中にエラーが発生しました。もう一度お試しください。"
						onRetry={startPriceRevisionCheck}
					/>
				)}
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
	},
	introCard: {
		backgroundColor: Colors.surface,
		borderRadius: 20,
		padding: 24,
		alignItems: "center",
		gap: 10,
		marginBottom: 24,
	},
	introTitle: {
		fontSize: 17,
		fontWeight: "800",
		color: Colors.text,
		textAlign: "center",
	},
	introText: {
		fontSize: 13,
		color: Colors.textSub,
		textAlign: "center",
		lineHeight: 20,
	},
	fileCard: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14,
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 18,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	fileIconWrap: {
		width: 52,
		height: 52,
		borderRadius: 26,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
	},
	fileTextArea: {
		flex: 1,
	},
	fileName: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.text,
	},
	fileMeta: {
		fontSize: 12,
		color: Colors.textMuted,
		marginTop: 4,
	},
	buttonGap: {
		marginBottom: 12,
	},
	debugLinkWrap: {
		marginTop: 16,
	},
});

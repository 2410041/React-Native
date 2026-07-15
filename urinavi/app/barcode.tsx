import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";
import { ErrorState } from "@/components/ErrorState";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { mockTestBarcodes } from "@/data/barcodes";
import { findProductByJanCode } from "@/data/products";

type ScanResult =
	| { type: "found"; productId: string; name: string }
	| { type: "notfound"; janCode: string }
	| null;

export default function BarcodeScreen() {
	const { store } = useApp();
	const [permissionGranted, setPermissionGranted] = useState(true);
	const [torchOn, setTorchOn] = useState(false);
	const [result, setResult] = useState<ScanResult>(null);

	function handleTestScan(janCode: string) {
		if (!store) return;
		const product = findProductByJanCode(janCode, store.id);
		if (product) {
			setResult({ type: "found", productId: product.id, name: product.name });
		} else {
			setResult({ type: "notfound", janCode });
		}
	}

	if (!permissionGranted) {
		return (
			<View style={styles.screen}>
				<AppHeader title="バーコード読取" />
				<View style={styles.permissionArea}>
					<ErrorState
						variant="permission"
						title="カメラの権限がありません"
						message={"バーコードを読み取るにはカメラへのアクセスを許可してください"}
					/>
					<View style={styles.permissionAction}>
						<PrimaryButton
							label="カメラへのアクセスを許可する"
							icon="camera"
							onPress={() => setPermissionGranted(true)}
						/>
					</View>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<AppHeader title="バーコード読取" />

			<View style={styles.cameraFrame}>
				<SafeAreaView edges={["top"]} style={styles.cameraTopControls} pointerEvents="box-none">
					<TouchableOpacity
						style={[styles.lightButton, torchOn && styles.lightButtonActive]}
						onPress={() => setTorchOn((v) => !v)}
						accessibilityRole="button"
						accessibilityLabel={torchOn ? "ライトを消す" : "ライトをつける"}>
						<Ionicons name={torchOn ? "flash" : "flash-outline"} size={20} color={Colors.white} />
					</TouchableOpacity>
				</SafeAreaView>

				<View style={styles.scanBox}>
					<View style={[styles.corner, styles.cornerTL]} />
					<View style={[styles.corner, styles.cornerTR]} />
					<View style={[styles.corner, styles.cornerBL]} />
					<View style={[styles.corner, styles.cornerBR]} />
					<Ionicons name="barcode-outline" size={90} color={Colors.text} />
				</View>
				<Text style={styles.hint}>バーコードを枠内に合わせてください</Text>
			</View>

			<SafeAreaView edges={["bottom"]} style={styles.footer}>
				{result ? (
					<View style={styles.resultCard}>
						{result.type === "found" ? (
							<>
								<Ionicons name="checkmark-circle" size={28} color={Colors.success} />
								<Text style={styles.resultTitle}>読取に成功しました</Text>
								<Text style={styles.resultText} numberOfLines={2}>
									{result.name}
								</Text>
								<View style={styles.resultButtonRow}>
									<View style={styles.resultButtonFlex}>
										<SecondaryButton label="再読取" icon="refresh" onPress={() => setResult(null)} />
									</View>
									<View style={styles.resultButtonFlex}>
										<PrimaryButton
											label="商品詳細を見る"
											icon="arrow-forward"
											onPress={() => router.push(`/product/${result.productId}`)}
										/>
									</View>
								</View>
							</>
						) : (
							<>
								<Ionicons name="close-circle" size={28} color={Colors.danger} />
								<Text style={styles.resultTitle}>該当商品が見つかりません</Text>
								<Text style={styles.resultText}>JANコード：{result.janCode}</Text>
								<SecondaryButton label="再読取" icon="refresh" onPress={() => setResult(null)} />
							</>
						)}
					</View>
				) : (
					<>
						<Text style={styles.testLabel}>テスト読取（モックJANコード）</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.testRow}>
							{mockTestBarcodes.map((code) => (
								<TouchableOpacity
									key={code.janCode}
									style={styles.testButton}
									activeOpacity={0.85}
									onPress={() => handleTestScan(code.janCode)}
									accessibilityRole="button"
									accessibilityLabel={`${code.label}をテスト読取`}>
									<Ionicons name="scan" size={16} color={Colors.white} />
									<Text style={styles.testButtonText} numberOfLines={1}>
										{code.label}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
						<TouchableOpacity
							style={styles.permissionDemoLink}
							onPress={() => setPermissionGranted(false)}
							accessibilityRole="button"
							accessibilityLabel="カメラ権限なし画面を確認する">
							<Text style={styles.permissionDemoText}>カメラ権限なし画面を確認する</Text>
						</TouchableOpacity>
					</>
				)}
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	permissionArea: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	permissionAction: {
		marginTop: 8,
	},
	cameraFrame: {
		flex: 1,
		backgroundColor: "#374151",
		alignItems: "center",
		justifyContent: "center",
		gap: 16,
	},
	cameraTopControls: {
		position: "absolute",
		top: 0,
		right: 0,
		left: 0,
		alignItems: "flex-end",
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	lightButton: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: "rgba(255,255,255,0.16)",
		alignItems: "center",
		justifyContent: "center",
	},
	lightButtonActive: {
		backgroundColor: Colors.primary,
	},
	scanBox: {
		width: "72%",
		maxWidth: 280,
		aspectRatio: 1.3,
		backgroundColor: "rgba(255,255,255,0.08)",
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	corner: {
		position: "absolute",
		width: 28,
		height: 28,
		borderColor: Colors.primary,
	},
	cornerTL: {
		top: -4,
		left: -4,
		borderTopWidth: 4,
		borderLeftWidth: 4,
	},
	cornerTR: {
		top: -4,
		right: -4,
		borderTopWidth: 4,
		borderRightWidth: 4,
	},
	cornerBL: {
		bottom: -4,
		left: -4,
		borderBottomWidth: 4,
		borderLeftWidth: 4,
	},
	cornerBR: {
		bottom: -4,
		right: -4,
		borderBottomWidth: 4,
		borderRightWidth: 4,
	},
	hint: {
		color: "#D1D5DB",
		fontSize: 13,
	},
	footer: {
		backgroundColor: Colors.background,
	},
	testLabel: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.textSub,
		paddingHorizontal: 20,
		paddingTop: 14,
	},
	testRow: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		gap: 10,
	},
	testButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		backgroundColor: Colors.primary,
		borderRadius: 999,
		paddingVertical: 12,
		paddingHorizontal: 16,
		minHeight: 44,
	},
	testButtonText: {
		color: Colors.white,
		fontSize: 13,
		fontWeight: "700",
		maxWidth: 160,
	},
	permissionDemoLink: {
		alignItems: "center",
		paddingVertical: 10,
		paddingBottom: 16,
	},
	permissionDemoText: {
		fontSize: 12,
		color: Colors.textMuted,
		textDecorationLine: "underline",
	},
	resultCard: {
		alignItems: "center",
		gap: 8,
		paddingHorizontal: 20,
		paddingVertical: 18,
	},
	resultTitle: {
		fontSize: 16,
		fontWeight: "800",
		color: Colors.text,
	},
	resultText: {
		fontSize: 13,
		color: Colors.textSub,
		textAlign: "center",
		marginBottom: 8,
	},
	resultButtonRow: {
		flexDirection: "row",
		gap: 10,
		width: "100%",
	},
	resultButtonFlex: {
		flex: 1,
	},
});

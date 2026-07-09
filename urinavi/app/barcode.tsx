import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { Colors } from "@/constants/colors";
import { findProductByBarcode, mockEmployee } from "@/constants/mockData";

const TEST_BARCODE = "4902102112621";

export default function BarcodeScreen() {
	function handleTestScan() {
		const product = findProductByBarcode(TEST_BARCODE, mockEmployee.storeId);
		if (product) {
			router.push(`/product/${product.id}`);
		}
	}

	return (
		<View style={styles.screen}>
			<AppHeader title="バーコード読取" />

			<View style={styles.cameraFrame}>
				<View style={styles.scanBox}>
					<View style={[styles.corner, styles.cornerTL]} />
					<View style={[styles.corner, styles.cornerTR]} />
					<View style={[styles.corner, styles.cornerBL]} />
					<View style={[styles.corner, styles.cornerBR]} />
					<Ionicons name="barcode-outline" size={90} color={Colors.text} />
					<Text style={styles.barcodeNumber}>{TEST_BARCODE}</Text>
				</View>
				<Text style={styles.hint}>バーコードを枠内に合わせてください</Text>
			</View>

			<View style={styles.footer}>
				<TouchableOpacity
					style={styles.testButton}
					activeOpacity={0.85}
					onPress={handleTestScan}>
					<Ionicons name="scan" size={20} color={Colors.white} />
					<Text style={styles.testButtonText}>テスト読取</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	cameraFrame: {
		flex: 1,
		backgroundColor: "#374151",
		alignItems: "center",
		justifyContent: "center",
		gap: 16,
	},
	scanBox: {
		width: 260,
		height: 200,
		backgroundColor: Colors.white,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	corner: {
		position: "absolute",
		width: 28,
		height: 28,
		borderColor: Colors.primary,
	},
	cornerTL: {
		top: -6,
		left: -6,
		borderTopWidth: 4,
		borderLeftWidth: 4,
	},
	cornerTR: {
		top: -6,
		right: -6,
		borderTopWidth: 4,
		borderRightWidth: 4,
	},
	cornerBL: {
		bottom: -6,
		left: -6,
		borderBottomWidth: 4,
		borderLeftWidth: 4,
	},
	cornerBR: {
		bottom: -6,
		right: -6,
		borderBottomWidth: 4,
		borderRightWidth: 4,
	},
	barcodeNumber: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
		letterSpacing: 2,
	},
	hint: {
		color: "#D1D5DB",
		fontSize: 13,
	},
	footer: {
		padding: 20,
		backgroundColor: Colors.background,
	},
	testButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: Colors.primary,
		borderRadius: 16,
		paddingVertical: 16,
	},
	testButtonText: {
		color: Colors.white,
		fontSize: 17,
		fontWeight: "700",
	},
});

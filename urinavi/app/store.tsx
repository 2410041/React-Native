import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { ScreenContainer } from "@/components/ScreenContainer";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { departments } from "@/data/departments";

function formatDateTime(iso: string): string {
	const date = new Date(iso);
	return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${String(
		date.getHours()
	).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

type InfoRowProps = {
	icon: keyof typeof Ionicons.glyphMap;
	label: string;
	value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
	return (
		<View style={styles.row}>
			<View style={styles.rowIcon}>
				<Ionicons name={icon} size={18} color={Colors.primary} />
			</View>
			<View style={styles.rowText}>
				<Text style={styles.rowLabel}>{label}</Text>
				<Text style={styles.rowValue}>{value}</Text>
			</View>
		</View>
	);
}

export default function StoreScreen() {
	const { store } = useApp();

	if (!store) {
		return <Redirect href="/login" />;
	}

	return (
		<View style={styles.screen}>
			<AppHeader title="店舗情報" />

			<ScreenContainer scroll>
				<View style={styles.headerCard}>
					<View style={styles.iconWrap}>
						<Ionicons name="storefront" size={36} color={Colors.primary} />
					</View>
					<Text style={styles.storeName}>{store.name}</Text>
					<Text style={styles.storeCode}>店舗コード：{store.code}</Text>
				</View>

				<View style={styles.card}>
					<InfoRow icon="location-outline" label="住所" value={store.address} />
					<InfoRow icon="time-outline" label="営業時間" value={store.businessHours} />
					<InfoRow icon="cube-outline" label="登録商品数" value={`${store.productCount.toLocaleString()}点`} />
					<InfoRow icon="refresh-outline" label="最終データ更新日時" value={formatDateTime(store.lastUpdatedAt)} />
				</View>

				<Text style={styles.sectionTitle}>利用できる部門</Text>
				<View style={styles.chipWrap}>
					{store.departmentCodes.map((code) => {
						const department = departments.find((d) => d.code === code);
						if (!department) return null;
						return (
							<View key={code} style={styles.chip}>
								<Text style={styles.chipText}>{department.name}</Text>
							</View>
						);
					})}
				</View>

				<View style={styles.buttonWrap}>
					<SecondaryButton
						label="店舗全体マップを見る"
						icon="map-outline"
						onPress={() => router.push("/map/store")}
					/>
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
	headerCard: {
		alignItems: "center",
		gap: 6,
		marginBottom: 20,
	},
	iconWrap: {
		width: 72,
		height: 72,
		borderRadius: 36,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 6,
	},
	storeName: {
		fontSize: 19,
		fontWeight: "800",
		color: Colors.text,
		textAlign: "center",
	},
	storeCode: {
		fontSize: 12,
		color: Colors.textMuted,
	},
	card: {
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 8,
		marginBottom: 20,
	},
	row: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 12,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: Colors.border,
	},
	rowIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
	},
	rowText: {
		flex: 1,
	},
	rowLabel: {
		fontSize: 12,
		color: Colors.textMuted,
	},
	rowValue: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.text,
		marginTop: 2,
		lineHeight: 20,
	},
	sectionTitle: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.textSub,
		marginBottom: 12,
	},
	chipWrap: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginBottom: 24,
	},
	chip: {
		backgroundColor: Colors.surface,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 999,
		paddingHorizontal: 14,
		paddingVertical: 8,
	},
	chipText: {
		fontSize: 13,
		fontWeight: "600",
		color: Colors.textSub,
	},
	buttonWrap: {
		marginTop: 4,
	},
});

import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { LocationCard } from "@/components/LocationCard";
import { Colors } from "@/constants/colors";
import { getProductById } from "@/constants/mockData";

export default function MapScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const product = getProductById(id);

	if (!product) {
		return <Redirect href="/home" />;
	}

	return (
		<View style={styles.screen}>
			<AppHeader title="商品の場所案内" />

			<ScrollView contentContainerStyle={styles.content}>
				<Text style={styles.name}>{product.name}</Text>

				<LocationCard
					title="商品の場所はこちら"
					aisleNumber={product.aisleNumber}
					sectionName={product.sectionName}
					landmark={product.landmark}
				/>

				<View style={styles.mapCard}>
					<View style={styles.mapTopRow}>
						<View style={styles.mapZone}>
							<Text style={styles.zoneText}>青果</Text>
						</View>
						<View style={styles.mapZone}>
							<Text style={styles.zoneText}>鮮魚</Text>
						</View>
						<View style={styles.mapZone}>
							<Text style={styles.zoneText}>惣菜</Text>
						</View>
					</View>

					<View style={styles.mapMidRow}>
						<View style={styles.aisleColumn}>
							<View style={styles.aisleCircle}>
								<Text style={styles.aisleCircleText}>{product.aisleNumber}</Text>
							</View>
						</View>

						<View style={styles.beverageZone}>
							<Text style={styles.zoneText}>飲料売場</Text>
							<View style={styles.pin}>
								<Ionicons name="location" size={26} color={Colors.danger} />
							</View>
						</View>

						<View style={styles.routeArea}>
							{[0, 1, 2, 3].map((i) => (
								<View key={i} style={styles.dot} />
							))}
						</View>

						<View style={styles.registerZone}>
							<Text style={styles.zoneTextVertical}>レジ</Text>
							<Ionicons
								name="snow"
								size={18}
								color={Colors.primary}
								style={styles.snowIcon}
							/>
						</View>
					</View>

					<View style={styles.mapBottomRow}>
						<Text style={styles.entranceText}>入口</Text>
					</View>
				</View>

				<View style={styles.noteCard}>
					<Text style={styles.noteTitle}>ご案内・メモ</Text>
					{product.guideNotes.map((note) => (
						<View key={note} style={styles.noteRow}>
							<Ionicons name="checkmark-circle" size={16} color={Colors.primary} />
							<Text style={styles.noteText}>{note}</Text>
						</View>
					))}
				</View>

				<TouchableOpacity activeOpacity={0.85} style={styles.confirmButton}>
					<Ionicons name="map" size={20} color={Colors.white} />
					<Text style={styles.confirmButtonText}>マップで確認</Text>
				</TouchableOpacity>
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
	name: {
		fontSize: 18,
		fontWeight: "800",
		color: Colors.text,
		marginBottom: 16,
	},
	mapCard: {
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 14,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	mapTopRow: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 8,
	},
	mapZone: {
		flex: 1,
		backgroundColor: Colors.grayBg,
		borderRadius: 10,
		paddingVertical: 14,
		alignItems: "center",
	},
	zoneText: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.textSub,
	},
	mapMidRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 8,
	},
	aisleColumn: {
		width: 32,
		alignItems: "center",
	},
	aisleCircle: {
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: Colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	aisleCircleText: {
		color: Colors.white,
		fontSize: 13,
		fontWeight: "800",
	},
	beverageZone: {
		flex: 2,
		backgroundColor: Colors.primaryLight,
		borderRadius: 10,
		paddingVertical: 30,
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	pin: {
		marginTop: 2,
	},
	routeArea: {
		width: 30,
		alignItems: "center",
		justifyContent: "space-between",
		height: 60,
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: Colors.primary,
	},
	registerZone: {
		flex: 1,
		backgroundColor: Colors.grayBg,
		borderRadius: 10,
		paddingVertical: 30,
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
	},
	zoneTextVertical: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.textSub,
	},
	snowIcon: {
		marginTop: 2,
	},
	mapBottomRow: {
		alignItems: "center",
		paddingVertical: 10,
		borderTopWidth: 1,
		borderTopColor: Colors.border,
		marginTop: 4,
	},
	entranceText: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.textSub,
	},
	noteCard: {
		backgroundColor: Colors.primaryLight,
		borderRadius: 16,
		padding: 16,
		marginBottom: 24,
	},
	noteTitle: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.primary,
		marginBottom: 10,
	},
	noteRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 8,
		marginBottom: 8,
	},
	noteText: {
		flex: 1,
		fontSize: 13,
		color: Colors.text,
		lineHeight: 19,
	},
	confirmButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: Colors.primary,
		borderRadius: 16,
		paddingVertical: 16,
	},
	confirmButtonText: {
		color: Colors.white,
		fontSize: 16,
		fontWeight: "700",
	},
});

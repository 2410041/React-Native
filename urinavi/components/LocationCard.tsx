import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";

type LocationCardProps = {
	aisleNumber: number;
	sectionName: string;
	landmark: string;
	title?: string;
};

export function LocationCard({
	aisleNumber,
	sectionName,
	landmark,
	title = "商品の場所",
}: LocationCardProps) {
	return (
		<View style={styles.card}>
			{title ? <Text style={styles.cardTitle}>{title}</Text> : null}
			<View style={styles.row}>
				<Ionicons name="location" size={18} color={Colors.primary} />
				<Text style={styles.label}>通路番号：</Text>
				<Text style={styles.value}>{aisleNumber}</Text>
			</View>
			<View style={styles.row}>
				<Ionicons name="storefront" size={18} color={Colors.primary} />
				<Text style={styles.label}>売場名：</Text>
				<Text style={styles.value} numberOfLines={2}>
					{sectionName}
				</Text>
			</View>
			<View style={styles.row}>
				<Ionicons name="flag" size={18} color={Colors.primary} />
				<Text style={styles.label}>目印：</Text>
				<Text style={[styles.value, styles.valueFlex]} numberOfLines={2}>
					{landmark}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 18,
		marginBottom: 16,
		width: "100%",
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.primary,
		marginBottom: 12,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		gap: 6,
	},
	label: {
		fontSize: 15,
		color: Colors.textSub,
	},
	value: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.text,
	},
	valueFlex: {
		flex: 1,
	},
});

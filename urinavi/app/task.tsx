import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "@/components/BottomNav";
import { Colors, Gradients } from "@/constants/colors";

export default function TaskScreen() {
	return (
		<View style={styles.screen}>
			<LinearGradient colors={Gradients.header} style={styles.header}>
				<SafeAreaView edges={["top"]}>
					<Text style={styles.headerTitle}>タスク</Text>
				</SafeAreaView>
			</LinearGradient>

			<View style={styles.content}>
				<Ionicons name="clipboard-outline" size={48} color={Colors.textMuted} />
				<Text style={styles.emptyTitle}>タスクはまだありません</Text>
				<Text style={styles.emptyText}>
					割り当てられた補充・品出しタスクがここに表示されます
				</Text>
			</View>

			<BottomNav active="task" />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	header: {
		borderBottomLeftRadius: 28,
		borderBottomRightRadius: 28,
		paddingBottom: 20,
	},
	headerTitle: {
		color: Colors.white,
		fontSize: 22,
		fontWeight: "800",
		paddingHorizontal: 22,
		paddingTop: 16,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 40,
		gap: 10,
	},
	emptyTitle: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
	},
	emptyText: {
		fontSize: 13,
		color: Colors.textMuted,
		textAlign: "center",
		lineHeight: 19,
	},
});

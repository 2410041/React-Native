import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { DepartmentSelector } from "@/components/DepartmentSelector";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { getDepartmentName } from "@/data/departments";

export default function DepartmentScreen() {
	const { employee, currentDepartment, isHelpingOtherDepartment, setCurrentDepartment, resetToNormalDepartment } =
		useApp();

	if (!employee) {
		return <Redirect href="/login" />;
	}

	const currentDepartmentName =
		currentDepartment === "all" ? "すべての部門" : getDepartmentName(currentDepartment);

	return (
		<View style={styles.screen}>
			<AppHeader title="担当部門切り替え" />

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.statusCard}>
					<View style={styles.statusRow}>
						<Ionicons name="pricetag" size={18} color={Colors.primary} />
						<Text style={styles.statusLabel}>現在の担当部門</Text>
					</View>
					<Text style={styles.statusValue}>{currentDepartmentName}</Text>
					<View style={[styles.statusTag, isHelpingOtherDepartment ? styles.helpingTag : styles.normalTag]}>
						<Ionicons
							name={isHelpingOtherDepartment ? "swap-horizontal" : "checkmark-circle"}
							size={14}
							color={isHelpingOtherDepartment ? Colors.warning : Colors.primary}
						/>
						<Text
							style={[
								styles.statusTagText,
								{ color: isHelpingOtherDepartment ? Colors.warning : Colors.primary },
							]}>
							{isHelpingOtherDepartment ? "応援中" : "通常担当"}
						</Text>
					</View>
					<Text style={styles.normalDepartmentText}>
						通常担当部門：{getDepartmentName(employee.normalDepartmentCode)}
					</Text>
				</View>

				{isHelpingOtherDepartment && (
					<View style={styles.resetWrap}>
						<SecondaryButton
							label="通常担当部門に戻す"
							icon="return-up-back"
							onPress={resetToNormalDepartment}
						/>
					</View>
				)}

				<Text style={styles.sectionTitle}>部門を選択</Text>
				<DepartmentSelector
					value={currentDepartment}
					onChange={setCurrentDepartment}
					variant="list"
					normalDepartmentCode={employee.normalDepartmentCode}
				/>

				<View style={styles.homeButtonWrap}>
					<PrimaryButton label="ホームへ戻る" icon="home" onPress={() => router.replace("/home")} />
				</View>
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
	statusCard: {
		backgroundColor: Colors.surface,
		borderRadius: 20,
		padding: 20,
		marginBottom: 16,
		gap: 6,
	},
	statusRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	statusLabel: {
		fontSize: 13,
		color: Colors.textSub,
		fontWeight: "600",
	},
	statusValue: {
		fontSize: 22,
		fontWeight: "800",
		color: Colors.text,
		marginTop: 2,
	},
	statusTag: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		alignSelf: "flex-start",
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 999,
		marginTop: 8,
	},
	normalTag: {
		backgroundColor: Colors.primaryLight,
	},
	helpingTag: {
		backgroundColor: Colors.warningBg,
	},
	statusTagText: {
		fontSize: 12,
		fontWeight: "700",
	},
	normalDepartmentText: {
		fontSize: 13,
		color: Colors.textMuted,
		marginTop: 10,
	},
	resetWrap: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.textSub,
		marginBottom: 12,
	},
	homeButtonWrap: {
		marginTop: 24,
	},
});

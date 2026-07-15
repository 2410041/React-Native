import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { getDepartmentName } from "@/data/departments";

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
				<Text style={styles.rowValue} numberOfLines={2}>
					{value}
				</Text>
			</View>
		</View>
	);
}

export default function EmployeeScreen() {
	const { employee, store, currentDepartment, isHelpingOtherDepartment, isLoggedIn } = useApp();

	if (!employee || !store) {
		return <Redirect href="/login" />;
	}

	const currentDepartmentName =
		currentDepartment === "all" ? "すべての部門" : getDepartmentName(currentDepartment);

	return (
		<View style={styles.screen}>
			<AppHeader title="従業員情報" />

			<ScreenContainer scroll>
				<View style={styles.profileHeader}>
					<View style={styles.avatar}>
						<Ionicons name="person" size={36} color={Colors.primary} />
					</View>
					<Text style={styles.name}>{employee.name}さん</Text>
					<View style={styles.loginTag}>
						<Ionicons
							name={isLoggedIn ? "checkmark-circle" : "close-circle"}
							size={14}
							color={isLoggedIn ? Colors.success : Colors.gray}
						/>
						<Text style={styles.loginTagText}>{isLoggedIn ? "ログイン中" : "未ログイン"}</Text>
					</View>
				</View>

				<View style={styles.card}>
					<InfoRow icon="key-outline" label="責番" value={String(employee.employeeNumber)} />
					<InfoRow icon="storefront-outline" label="店舗" value={store.name} />
					<InfoRow icon="ribbon-outline" label="権限" value={employee.role} />
					<InfoRow
						icon="pricetag-outline"
						label="通常担当部門"
						value={getDepartmentName(employee.normalDepartmentCode)}
					/>
					<InfoRow
						icon="swap-horizontal-outline"
						label="現在選択中の部門"
						value={`${currentDepartmentName}${isHelpingOtherDepartment ? "（応援中）" : ""}`}
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
	profileHeader: {
		alignItems: "center",
		gap: 8,
		marginBottom: 20,
	},
	avatar: {
		width: 76,
		height: 76,
		borderRadius: 38,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
	},
	name: {
		fontSize: 19,
		fontWeight: "800",
		color: Colors.text,
	},
	loginTag: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		backgroundColor: Colors.surface,
		paddingHorizontal: 12,
		paddingVertical: 5,
		borderRadius: 999,
	},
	loginTagText: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.textSub,
	},
	card: {
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 8,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
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
	},
});

import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/colors";
import { departments } from "@/data/departments";
import { DepartmentCode } from "@/types/department";

export type SelectedDepartment = DepartmentCode | "all";

type DepartmentSelectorProps = {
	value: SelectedDepartment;
	onChange: (code: SelectedDepartment) => void;
	includeAll?: boolean;
	variant?: "chips" | "list";
	normalDepartmentCode?: DepartmentCode;
};

export function DepartmentSelector({
	value,
	onChange,
	includeAll = true,
	variant = "chips",
	normalDepartmentCode,
}: DepartmentSelectorProps) {
	const options: { code: SelectedDepartment; name: string }[] = [
		...(includeAll ? [{ code: "all" as SelectedDepartment, name: "すべての部門" }] : []),
		...departments.map((d) => ({ code: d.code as SelectedDepartment, name: d.name })),
	];

	if (variant === "list") {
		return (
			<View style={styles.listContainer}>
				{options.map((option) => {
					const isActive = option.code === value;
					const isNormal = option.code === normalDepartmentCode;
					return (
						<TouchableOpacity
							key={option.code}
							style={[styles.listRow, isActive && styles.listRowActive]}
							activeOpacity={0.7}
							onPress={() => onChange(option.code)}
							accessibilityRole="radio"
							accessibilityState={{ selected: isActive }}
							accessibilityLabel={option.name}>
							<Ionicons
								name={isActive ? "radio-button-on" : "radio-button-off"}
								size={20}
								color={isActive ? Colors.primary : Colors.textMuted}
							/>
							<Text style={[styles.listLabel, isActive && styles.listLabelActive]}>
								{option.name}
							</Text>
							{isNormal && (
								<View style={styles.normalTag}>
									<Text style={styles.normalTagText}>通常担当</Text>
								</View>
							)}
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.chipsRow}>
			{options.map((option) => {
				const isActive = option.code === value;
				return (
					<TouchableOpacity
						key={option.code}
						style={[styles.chip, isActive && styles.chipActive]}
						activeOpacity={0.7}
						onPress={() => onChange(option.code)}
						accessibilityRole="button"
						accessibilityState={{ selected: isActive }}
						accessibilityLabel={option.name}>
						<Text style={[styles.chipText, isActive && styles.chipTextActive]}>
							{option.name}
						</Text>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	chipsRow: {
		gap: 8,
		paddingVertical: 4,
	},
	chip: {
		paddingHorizontal: 16,
		paddingVertical: 9,
		borderRadius: 999,
		backgroundColor: Colors.surface,
		borderWidth: 1,
		borderColor: Colors.border,
		minHeight: 40,
		justifyContent: "center",
	},
	chipActive: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
	},
	chipText: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.textSub,
	},
	chipTextActive: {
		color: Colors.white,
	},
	listContainer: {
		gap: 10,
	},
	listRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		backgroundColor: Colors.surface,
		borderRadius: 14,
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderWidth: 1.5,
		borderColor: Colors.border,
		minHeight: 52,
	},
	listRowActive: {
		borderColor: Colors.primary,
		backgroundColor: Colors.primaryLight,
	},
	listLabel: {
		flex: 1,
		fontSize: 15,
		fontWeight: "600",
		color: Colors.text,
	},
	listLabelActive: {
		color: Colors.primaryDark,
		fontWeight: "700",
	},
	normalTag: {
		backgroundColor: Colors.white,
		borderRadius: 999,
		paddingHorizontal: 10,
		paddingVertical: 3,
	},
	normalTagText: {
		fontSize: 11,
		fontWeight: "700",
		color: Colors.primary,
	},
});

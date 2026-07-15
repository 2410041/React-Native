import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { DefaultDepartmentOption, FontSizeOption, ThemeOption } from "@/types/settings";

const fontSizeOptions: { key: FontSizeOption; label: string }[] = [
	{ key: "small", label: "小" },
	{ key: "medium", label: "標準" },
	{ key: "large", label: "大" },
];

const themeOptions: { key: ThemeOption; label: string }[] = [
	{ key: "light", label: "ライト" },
	{ key: "system", label: "端末に合わせる" },
];

const defaultDepartmentOptions: { key: DefaultDepartmentOption; label: string }[] = [
	{ key: "normal", label: "通常担当部門" },
	{ key: "all", label: "すべての部門" },
];

type SwitchRowProps = {
	icon: keyof typeof Ionicons.glyphMap;
	label: string;
	value: boolean;
	onValueChange: (value: boolean) => void;
};

function SwitchRow({ icon, label, value, onValueChange }: SwitchRowProps) {
	return (
		<View style={styles.switchRow}>
			<Ionicons name={icon} size={20} color={Colors.textSub} />
			<Text style={styles.switchLabel}>{label}</Text>
			<Switch
				value={value}
				onValueChange={onValueChange}
				trackColor={{ false: Colors.border, true: Colors.primaryLight }}
				thumbColor={
					Platform.OS === "android" ? (value ? Colors.primary : Colors.gray) : undefined
				}
				ios_backgroundColor={Colors.border}
				accessibilityLabel={label}
			/>
		</View>
	);
}

type OptionRowProps<T extends string> = {
	title: string;
	options: { key: T; label: string }[];
	value: T;
	onChange: (value: T) => void;
};

function OptionRow<T extends string>({ title, options, value, onChange }: OptionRowProps<T>) {
	return (
		<View style={styles.optionBlock}>
			<Text style={styles.optionTitle}>{title}</Text>
			<View style={styles.optionChipRow}>
				{options.map((option) => {
					const isActive = option.key === value;
					return (
						<TouchableOpacity
							key={option.key}
							style={[styles.optionChip, isActive && styles.optionChipActive]}
							onPress={() => onChange(option.key)}
							accessibilityRole="button"
							accessibilityState={{ selected: isActive }}
							accessibilityLabel={option.label}>
							<Text style={[styles.optionChipText, isActive && styles.optionChipTextActive]}>
								{option.label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}

export default function SettingsScreen() {
	const { settings, updateSettings, logout } = useApp();
	const [confirmVisible, setConfirmVisible] = useState(false);

	return (
		<View style={styles.screen}>
			<AppHeader title="設定" />

			<ScreenContainer scroll>
				<View style={styles.card}>
					<SwitchRow
						icon="notifications-outline"
						label="通知"
						value={settings.notificationsEnabled}
						onValueChange={(v) => updateSettings({ notificationsEnabled: v })}
					/>
					<SwitchRow
						icon="phone-portrait-outline"
						label="バイブレーション"
						value={settings.vibrationEnabled}
						onValueChange={(v) => updateSettings({ vibrationEnabled: v })}
					/>
					<SwitchRow
						icon="volume-high-outline"
						label="スキャン音"
						value={settings.scanSoundEnabled}
						onValueChange={(v) => updateSettings({ scanSoundEnabled: v })}
					/>
				</View>

				<View style={styles.card}>
					<OptionRow
						title="文字サイズ"
						options={fontSizeOptions}
						value={settings.fontSize}
						onChange={(v) => updateSettings({ fontSize: v })}
					/>
					<View style={styles.optionDivider} />
					<OptionRow
						title="テーマ"
						options={themeOptions}
						value={settings.theme}
						onChange={(v) => updateSettings({ theme: v })}
					/>
					<View style={styles.optionDivider} />
					<OptionRow
						title="担当部門の初期表示"
						options={defaultDepartmentOptions}
						value={settings.defaultDepartment}
						onChange={(v) => updateSettings({ defaultDepartment: v })}
					/>
				</View>

				<TouchableOpacity
					style={styles.logoutButton}
					activeOpacity={0.7}
					onPress={() => setConfirmVisible(true)}
					accessibilityRole="button"
					accessibilityLabel="ログアウト">
					<Ionicons name="log-out-outline" size={20} color={Colors.danger} />
					<Text style={styles.logoutText}>ログアウト</Text>
				</TouchableOpacity>
			</ScreenContainer>

			<ConfirmModal
				visible={confirmVisible}
				title="ログアウトしますか？"
				message="ログイン画面に戻ります。"
				confirmLabel="ログアウト"
				destructive
				onConfirm={() => {
					setConfirmVisible(false);
					logout();
					router.replace("/login");
				}}
				onCancel={() => setConfirmVisible(false)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	card: {
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 16,
		marginBottom: 16,
	},
	switchRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 10,
		minHeight: 48,
	},
	switchLabel: {
		flex: 1,
		fontSize: 15,
		fontWeight: "600",
		color: Colors.text,
	},
	optionBlock: {
		paddingVertical: 6,
	},
	optionTitle: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.textSub,
		marginBottom: 10,
	},
	optionChipRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	optionChip: {
		paddingHorizontal: 14,
		paddingVertical: 9,
		borderRadius: 999,
		backgroundColor: Colors.grayBg,
		minHeight: 40,
		justifyContent: "center",
	},
	optionChipActive: {
		backgroundColor: Colors.primary,
	},
	optionChipText: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.textSub,
	},
	optionChipTextActive: {
		color: Colors.white,
	},
	optionDivider: {
		height: 1,
		backgroundColor: Colors.border,
		marginVertical: 10,
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		paddingVertical: 14,
		minHeight: 48,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: Colors.danger,
	},
	logoutText: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.danger,
	},
});

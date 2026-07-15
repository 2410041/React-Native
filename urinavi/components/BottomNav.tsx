import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/colors";

export type NavKey = "home" | "search" | "history" | "menu";

type NavItem = {
	key: NavKey;
	label: string;
	icon: keyof typeof Ionicons.glyphMap;
	iconActive: keyof typeof Ionicons.glyphMap;
	href: "/home" | "/search" | "/history" | "/menu";
};

const items: NavItem[] = [
	{ key: "home", label: "ホーム", icon: "home-outline", iconActive: "home", href: "/home" },
	{ key: "search", label: "検索", icon: "search-outline", iconActive: "search", href: "/search" },
	{ key: "history", label: "履歴", icon: "time-outline", iconActive: "time", href: "/history" },
	{ key: "menu", label: "メニュー", icon: "menu-outline", iconActive: "menu", href: "/menu" },
];

type BottomNavProps = {
	active: NavKey;
};

export function BottomNav({ active }: BottomNavProps) {
	return (
		<SafeAreaView edges={["bottom"]} style={styles.safeArea}>
			<View style={styles.container}>
				{items.map((item) => {
					const isActive = item.key === active;
					return (
						<TouchableOpacity
							key={item.key}
							style={styles.item}
							onPress={() => router.replace(item.href)}
							activeOpacity={0.7}
							accessibilityRole="tab"
							accessibilityState={{ selected: isActive }}
							accessibilityLabel={item.label}>
							<Ionicons
								name={isActive ? item.iconActive : item.icon}
								size={24}
								color={isActive ? Colors.primary : Colors.textMuted}
							/>
							<Text
								style={[
									styles.label,
									{ color: isActive ? Colors.primary : Colors.textMuted },
								]}>
								{item.label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: Colors.white,
		borderTopWidth: 1,
		borderTopColor: Colors.border,
	},
	container: {
		flexDirection: "row",
		paddingTop: 8,
		paddingBottom: 4,
	},
	item: {
		flex: 1,
		alignItems: "center",
		gap: 2,
		paddingVertical: 6,
		minHeight: 48,
	},
	label: {
		fontSize: 11,
		fontWeight: "600",
	},
});

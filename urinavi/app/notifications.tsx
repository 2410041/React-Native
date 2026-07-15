import { router } from "expo-router";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { EmptyState } from "@/components/EmptyState";
import { NotificationCard } from "@/components/NotificationCard";
import { Colors } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { Notification } from "@/types/notification";

export default function NotificationsScreen() {
	const { notifications, markNotificationRead, markAllNotificationsRead, unreadNotificationCount } =
		useApp();

	const sorted = useMemo(
		() =>
			[...notifications].sort(
				(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			),
		[notifications]
	);

	function handlePress(notification: Notification) {
		markNotificationRead(notification.id);
		if (notification.linkTo) {
			router.push(notification.linkTo);
		}
	}

	return (
		<View style={styles.screen}>
			<AppHeader
				title="通知"
				rightIcon={unreadNotificationCount > 0 ? "checkmark-done" : undefined}
				onRightPress={markAllNotificationsRead}
				rightAccessibilityLabel="すべて既読にする"
			/>

			{unreadNotificationCount > 0 && (
				<View style={styles.actionRow}>
					<Text style={styles.unreadText}>未読 {unreadNotificationCount}件</Text>
					<TouchableOpacity
						onPress={markAllNotificationsRead}
						hitSlop={10}
						accessibilityRole="button"
						accessibilityLabel="すべて既読にする">
						<Text style={styles.actionText}>すべて既読にする</Text>
					</TouchableOpacity>
				</View>
			)}

			<FlatList
				data={sorted}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<NotificationCard notification={item} onPress={() => handlePress(item)} />
				)}
				ListEmptyComponent={
					<EmptyState
						icon="notifications-off-outline"
						title="通知はありません"
						message="新しいお知らせが届くとここに表示されます"
					/>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	actionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 14,
	},
	unreadText: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.textSub,
	},
	actionText: {
		fontSize: 13,
		fontWeight: "700",
		color: Colors.primary,
	},
	list: {
		padding: 20,
		paddingBottom: 40,
		flexGrow: 1,
	},
});

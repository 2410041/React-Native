import { router } from "expo-router";
import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

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
				subtitle={unreadNotificationCount > 0 ? `未読 ${unreadNotificationCount}件` : "すべて既読"}
				rightIcon={unreadNotificationCount > 0 ? "checkmark-done" : undefined}
				onRightPress={markAllNotificationsRead}
				rightAccessibilityLabel="すべて既読にする"
				rightBadge={unreadNotificationCount > 0}
			/>

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
	list: {
		padding: 20,
		paddingBottom: 40,
		flexGrow: 1,
	},
});

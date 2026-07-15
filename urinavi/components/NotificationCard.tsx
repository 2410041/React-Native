import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/colors";
import { Notification, NotificationCategory } from "@/types/notification";

const categoryMeta: Record<
	NotificationCategory,
	{ icon: keyof typeof Ionicons.glyphMap; label: string }
> = {
	important: { icon: "alert-circle", label: "重要" },
	store: { icon: "storefront", label: "店舗" },
	priceRevision: { icon: "pricetag", label: "価格改定" },
	task: { icon: "clipboard", label: "タスク" },
};

function formatDateTime(iso: string): string {
	const date = new Date(iso);
	return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(
		date.getMinutes()
	).padStart(2, "0")}`;
}

type NotificationCardProps = {
	notification: Notification;
	onPress?: () => void;
};

export function NotificationCard({ notification, onPress }: NotificationCardProps) {
	const meta = categoryMeta[notification.category];
	return (
		<TouchableOpacity
			style={[styles.card, !notification.read && styles.cardUnread]}
			activeOpacity={0.7}
			onPress={onPress}
			accessibilityRole="button"
			accessibilityLabel={`${notification.read ? "既読" : "未読"} ${notification.title}`}>
			<View style={styles.iconCircle}>
				<Ionicons name={meta.icon} size={20} color={Colors.primary} />
			</View>
			<View style={styles.body}>
				<View style={styles.titleRow}>
					{notification.important && (
						<View style={styles.importantTag}>
							<Text style={styles.importantTagText}>重要</Text>
						</View>
					)}
					<Text style={styles.title} numberOfLines={2}>
						{notification.title}
					</Text>
				</View>
				<Text style={styles.text} numberOfLines={3}>
					{notification.body}
				</Text>
				<Text style={styles.time}>{formatDateTime(notification.createdAt)}</Text>
			</View>
			{!notification.read && <View style={styles.unreadDot} />}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		gap: 12,
		backgroundColor: Colors.surface,
		borderRadius: 16,
		padding: 14,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	cardUnread: {
		borderColor: Colors.primary,
		backgroundColor: Colors.primaryLight,
	},
	iconCircle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.white,
		alignItems: "center",
		justifyContent: "center",
	},
	body: {
		flex: 1,
		gap: 4,
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	importantTag: {
		backgroundColor: Colors.danger,
		borderRadius: 999,
		paddingHorizontal: 8,
		paddingVertical: 2,
	},
	importantTagText: {
		fontSize: 10,
		fontWeight: "800",
		color: Colors.white,
	},
	title: {
		flex: 1,
		fontSize: 15,
		fontWeight: "700",
		color: Colors.text,
	},
	text: {
		fontSize: 13,
		color: Colors.textSub,
		lineHeight: 18,
	},
	time: {
		fontSize: 11,
		color: Colors.textMuted,
		marginTop: 2,
	},
	unreadDot: {
		width: 9,
		height: 9,
		borderRadius: 5,
		backgroundColor: Colors.primary,
		marginTop: 4,
	},
});

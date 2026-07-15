import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { StatusBadge } from "@/components/StatusBadge";
import { getTaskPriorityMeta, getTaskStatusMeta } from "@/components/statusMeta";
import { Colors } from "@/constants/colors";
import { getDepartmentName } from "@/data/departments";
import { Task } from "@/types/task";

function formatDueDate(iso: string): string {
	const date = new Date(iso);
	return `${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(
		date.getMinutes()
	).padStart(2, "0")}まで`;
}

type TaskCardProps = {
	task: Task;
	onPress?: () => void;
	onAdvanceStatus?: () => void;
};

export function TaskCard({ task, onPress, onAdvanceStatus }: TaskCardProps) {
	const statusMeta = getTaskStatusMeta(task.status);
	const priorityMeta = getTaskPriorityMeta(task.priority);
	const nextActionLabel = task.status === "未対応" ? "対応する" : task.status === "対応中" ? "完了にする" : null;

	return (
		<TouchableOpacity style={styles.card} activeOpacity={0.75} onPress={onPress}>
			<View style={styles.headerRow}>
				<Text style={styles.title} numberOfLines={2}>
					{task.title}
				</Text>
				<StatusBadge meta={statusMeta} />
			</View>

			<Text style={styles.description} numberOfLines={2}>
				{task.description}
			</Text>

			<View style={styles.metaRow}>
				<StatusBadge meta={priorityMeta} size="small" />
				<View style={styles.metaItem}>
					<Ionicons name="pricetag-outline" size={13} color={Colors.textSub} />
					<Text style={styles.metaText}>{getDepartmentName(task.departmentCode)}</Text>
				</View>
				<View style={styles.metaItem}>
					<Ionicons name="time-outline" size={13} color={Colors.textSub} />
					<Text style={styles.metaText}>{formatDueDate(task.dueDate)}</Text>
				</View>
			</View>

			{nextActionLabel && onAdvanceStatus && (
				<TouchableOpacity
					style={styles.actionButton}
					activeOpacity={0.8}
					onPress={onAdvanceStatus}
					accessibilityRole="button"
					accessibilityLabel={nextActionLabel}>
					<Ionicons name="checkmark" size={16} color={Colors.white} />
					<Text style={styles.actionButtonText}>{nextActionLabel}</Text>
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.surface,
		borderRadius: 18,
		padding: 16,
		marginBottom: 14,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },
		elevation: 1,
		gap: 8,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		gap: 10,
	},
	title: {
		flex: 1,
		fontSize: 16,
		fontWeight: "700",
		color: Colors.text,
	},
	description: {
		fontSize: 13,
		color: Colors.textSub,
		lineHeight: 18,
	},
	metaRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		gap: 10,
	},
	metaItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	metaText: {
		fontSize: 12,
		color: Colors.textSub,
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
		backgroundColor: Colors.primary,
		borderRadius: 12,
		paddingVertical: 11,
		minHeight: 44,
		marginTop: 4,
	},
	actionButtonText: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.white,
	},
});

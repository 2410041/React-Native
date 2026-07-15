import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "@/components/BottomNav";
import { StatusBadge } from "@/components/StatusBadge";
import { getTaskPriorityMeta, getTaskStatusMeta } from "@/components/statusMeta";
import { TaskCard } from "@/components/TaskCard";
import { EmptyState } from "@/components/EmptyState";
import { Colors, Gradients } from "@/constants/colors";
import { useApp } from "@/context/AppContext";
import { getDepartmentName } from "@/data/departments";
import { tasks as initialTasks } from "@/data/tasks";
import { Task, TaskStatus } from "@/types/task";

function nextStatus(status: TaskStatus): TaskStatus {
	if (status === "未対応") return "対応中";
	if (status === "対応中") return "完了";
	return "完了";
}

function formatDueDate(iso: string): string {
	const date = new Date(iso);
	return `${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, "0")}:${String(
		date.getMinutes()
	).padStart(2, "0")}`;
}

export default function TaskScreen() {
	const { store } = useApp();
	const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);

	const storeTasks = tasks.filter((t) => t.storeId === (store?.id ?? t.storeId));

	function advanceStatus(taskId: string) {
		setTasks((current) =>
			current.map((t) => (t.id === taskId ? { ...t, status: nextStatus(t.status) } : t))
		);
		setSelectedTask((current) =>
			current && current.id === taskId ? { ...current, status: nextStatus(current.status) } : current
		);
	}

	return (
		<View style={styles.screen}>
			<LinearGradient colors={Gradients.header} style={styles.header}>
				<SafeAreaView edges={["top"]}>
					<Text style={styles.headerTitle}>タスク</Text>
				</SafeAreaView>
			</LinearGradient>

			<FlatList
				data={storeTasks}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<TaskCard
						task={item}
						onPress={() => setSelectedTask(item)}
						onAdvanceStatus={item.status === "完了" ? undefined : () => advanceStatus(item.id)}
					/>
				)}
				ListEmptyComponent={
					<EmptyState
						icon="clipboard-outline"
						title="タスクはまだありません"
						message="割り当てられた補充・品出しタスクがここに表示されます"
					/>
				}
			/>

			{selectedTask && (
				<Modal
					visible
					transparent
					animationType="fade"
					onRequestClose={() => setSelectedTask(null)}>
					<View style={styles.overlay}>
						<View style={styles.detailCard}>
							<View style={styles.detailHeaderRow}>
								<Text style={styles.detailTitle}>{selectedTask.title}</Text>
								<TouchableOpacity
									onPress={() => setSelectedTask(null)}
									hitSlop={10}
									accessibilityRole="button"
									accessibilityLabel="閉じる">
									<Ionicons name="close" size={22} color={Colors.textMuted} />
								</TouchableOpacity>
							</View>

							<View style={styles.badgeRow}>
								<StatusBadge meta={getTaskStatusMeta(selectedTask.status)} />
								<StatusBadge meta={getTaskPriorityMeta(selectedTask.priority)} />
							</View>

							<Text style={styles.detailDescription}>{selectedTask.description}</Text>

							<View style={styles.detailMetaRow}>
								<Ionicons name="pricetag-outline" size={15} color={Colors.textSub} />
								<Text style={styles.detailMetaText}>
									担当部門：{getDepartmentName(selectedTask.departmentCode)}
								</Text>
							</View>
							<View style={styles.detailMetaRow}>
								<Ionicons name="time-outline" size={15} color={Colors.textSub} />
								<Text style={styles.detailMetaText}>
									期限：{formatDueDate(selectedTask.dueDate)}
								</Text>
							</View>

							{selectedTask.status !== "完了" && (
								<TouchableOpacity
									style={styles.detailActionButton}
									activeOpacity={0.85}
									onPress={() => advanceStatus(selectedTask.id)}
									accessibilityRole="button"
									accessibilityLabel={
										selectedTask.status === "未対応" ? "対応する" : "完了にする"
									}>
									<Ionicons name="checkmark" size={18} color={Colors.white} />
									<Text style={styles.detailActionText}>
										{selectedTask.status === "未対応" ? "対応する" : "完了にする"}
									</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</Modal>
			)}

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
	list: {
		padding: 20,
		paddingBottom: 40,
		flexGrow: 1,
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(17,24,39,0.45)",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 24,
	},
	detailCard: {
		width: "100%",
		maxWidth: 380,
		backgroundColor: Colors.surface,
		borderRadius: 20,
		padding: 22,
		gap: 12,
	},
	detailHeaderRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		gap: 10,
	},
	detailTitle: {
		flex: 1,
		fontSize: 18,
		fontWeight: "800",
		color: Colors.text,
	},
	badgeRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	detailDescription: {
		fontSize: 14,
		color: Colors.textSub,
		lineHeight: 20,
	},
	detailMetaRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	detailMetaText: {
		fontSize: 13,
		color: Colors.textSub,
	},
	detailActionButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		backgroundColor: Colors.primary,
		borderRadius: 14,
		paddingVertical: 14,
		minHeight: 48,
		marginTop: 6,
	},
	detailActionText: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.white,
	},
});

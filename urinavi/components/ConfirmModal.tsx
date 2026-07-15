import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/colors";

type ConfirmModalProps = {
	visible: boolean;
	title: string;
	message?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	destructive?: boolean;
	onConfirm: () => void;
	onCancel: () => void;
};

export function ConfirmModal({
	visible,
	title,
	message,
	confirmLabel = "OK",
	cancelLabel = "キャンセル",
	destructive = false,
	onConfirm,
	onCancel,
}: ConfirmModalProps) {
	if (!visible) return null;

	return (
		<Modal visible transparent animationType="fade" onRequestClose={onCancel}>
			<View style={styles.overlay}>
				<View style={styles.card}>
					<Text style={styles.title}>{title}</Text>
					{message && <Text style={styles.message}>{message}</Text>}
					<View style={styles.buttonRow}>
						<TouchableOpacity
							style={[styles.button, styles.cancelButton]}
							activeOpacity={0.7}
							onPress={onCancel}
							accessibilityRole="button"
							accessibilityLabel={cancelLabel}>
							<Text style={styles.cancelText}>{cancelLabel}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.button,
								destructive ? styles.destructiveButton : styles.confirmButton,
							]}
							activeOpacity={0.85}
							onPress={onConfirm}
							accessibilityRole="button"
							accessibilityLabel={confirmLabel}>
							<Text style={styles.confirmText}>{confirmLabel}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(17,24,39,0.45)",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 28,
	},
	card: {
		width: "100%",
		maxWidth: 340,
		backgroundColor: Colors.surface,
		borderRadius: 20,
		padding: 22,
	},
	title: {
		fontSize: 17,
		fontWeight: "800",
		color: Colors.text,
		textAlign: "center",
		marginBottom: 8,
	},
	message: {
		fontSize: 14,
		color: Colors.textSub,
		textAlign: "center",
		lineHeight: 20,
		marginBottom: 20,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 10,
	},
	button: {
		flex: 1,
		minHeight: 48,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
	},
	cancelButton: {
		backgroundColor: Colors.grayBg,
	},
	confirmButton: {
		backgroundColor: Colors.primary,
	},
	destructiveButton: {
		backgroundColor: Colors.danger,
	},
	cancelText: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.textSub,
	},
	confirmText: {
		fontSize: 15,
		fontWeight: "700",
		color: Colors.white,
	},
});

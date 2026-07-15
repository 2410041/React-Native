import { Ionicons } from "@expo/vector-icons";
import { KeyboardTypeOptions, ReturnKeyTypeOptions, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/colors";

type SearchInputProps = {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	onSubmitEditing?: () => void;
	returnKeyType?: ReturnKeyTypeOptions;
	keyboardType?: KeyboardTypeOptions;
	accessibilityLabel?: string;
	autoFocus?: boolean;
};

export function SearchInput({
	value,
	onChangeText,
	placeholder = "検索",
	onSubmitEditing,
	returnKeyType = "search",
	keyboardType = "default",
	accessibilityLabel,
	autoFocus,
}: SearchInputProps) {
	return (
		<View style={styles.box}>
			<Ionicons name="search" size={18} color={Colors.textMuted} />
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				placeholderTextColor={Colors.textMuted}
				value={value}
				onChangeText={onChangeText}
				onSubmitEditing={onSubmitEditing}
				returnKeyType={returnKeyType}
				keyboardType={keyboardType}
				autoFocus={autoFocus}
				accessibilityLabel={accessibilityLabel ?? placeholder}
			/>
			{value.length > 0 && (
				<TouchableOpacity
					onPress={() => onChangeText("")}
					hitSlop={10}
					accessibilityLabel="入力をクリア"
					accessibilityRole="button">
					<Ionicons name="close-circle" size={18} color={Colors.textMuted} />
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	box: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.surface,
		borderRadius: 14,
		paddingHorizontal: 14,
		gap: 8,
		borderWidth: 1,
		borderColor: Colors.border,
		minHeight: 48,
	},
	input: {
		flex: 1,
		paddingVertical: 12,
		fontSize: 16,
		color: Colors.text,
	},
});

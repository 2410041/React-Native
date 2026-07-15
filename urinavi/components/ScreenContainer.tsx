import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/colors";

type ScreenContainerProps = {
	children: ReactNode;
	scroll?: boolean;
	edges?: readonly Edge[];
	contentStyle?: ViewStyle;
	avoidKeyboard?: boolean;
};

export function ScreenContainer({
	children,
	scroll = false,
	edges = ["bottom"],
	contentStyle,
	avoidKeyboard = false,
}: ScreenContainerProps) {
	const body = scroll ? (
		<ScrollView
			contentContainerStyle={[styles.content, contentStyle]}
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}>
			{children}
		</ScrollView>
	) : (
		<View style={[styles.flexContent, contentStyle]}>{children}</View>
	);

	return (
		<SafeAreaView edges={edges} style={styles.safeArea}>
			{avoidKeyboard ? (
				<KeyboardAvoidingView
					style={styles.flex}
					behavior={Platform.OS === "ios" ? "padding" : undefined}>
					{body}
				</KeyboardAvoidingView>
			) : (
				body
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	flex: {
		flex: 1,
	},
	content: {
		padding: 20,
		paddingBottom: 40,
	},
	flexContent: {
		flex: 1,
	},
});

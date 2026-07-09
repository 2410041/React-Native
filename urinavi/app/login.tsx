import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Gradients } from "@/constants/colors";

export default function LoginScreen() {
	const [employeeNumber, setEmployeeNumber] = useState("");
	const [error, setError] = useState<string | null>(null);

	function handleLogin() {
		const trimmed = employeeNumber.trim();
		if (!trimmed) {
			setError("直番を入力してください");
			return;
		}
		if (!/^\d+$/.test(trimmed)) {
			setError("直番は数字で入力してください");
			return;
		}
		setError(null);
		router.replace("/home");
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === "ios" ? "padding" : undefined}>
				<View style={styles.container}>
					<View style={styles.logoArea}>
						<View style={styles.logoCircle}>
							<Ionicons name="cart" size={40} color={Colors.primary} />
						</View>
						<Text style={styles.appName}>Urinavi</Text>
						<Text style={styles.appSub}>従業員用</Text>
					</View>

					<View style={styles.formCard}>
						<Text style={styles.formTitle}>直番でログイン</Text>

						<Text style={styles.label}>直番</Text>
						<TextInput
							style={[styles.input, error && styles.inputError]}
							placeholder="67"
							placeholderTextColor={Colors.textMuted}
							keyboardType="number-pad"
							value={employeeNumber}
							onChangeText={(text) => {
								setEmployeeNumber(text);
								if (error) setError(null);
							}}
						/>
						<Text style={styles.hint}>配布された直番を入力してください</Text>
						{error && <Text style={styles.errorText}>{error}</Text>}

						<TouchableOpacity
							activeOpacity={0.85}
							onPress={handleLogin}
							style={styles.loginButtonWrapper}>
							<LinearGradient
								colors={Gradients.primary}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								style={styles.loginButton}>
								<Text style={styles.loginButtonText}>ログイン</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.decoration}>
					<View style={styles.storeBuilding}>
						<Ionicons name="storefront" size={30} color={Colors.primary} />
						<Text style={styles.storeText}>SUPER MARKET</Text>
					</View>
				</View>
			</KeyboardAvoidingView>
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
		justifyContent: "space-between",
	},
	container: {
		paddingHorizontal: 24,
		paddingTop: 40,
	},
	logoArea: {
		alignItems: "center",
		marginBottom: 32,
	},
	logoCircle: {
		width: 84,
		height: 84,
		borderRadius: 42,
		backgroundColor: Colors.primaryLight,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 14,
	},
	appName: {
		fontSize: 34,
		fontWeight: "800",
		color: Colors.primary,
	},
	appSub: {
		fontSize: 15,
		color: Colors.textSub,
		marginTop: 4,
	},
	formCard: {
		backgroundColor: Colors.surface,
		borderRadius: 22,
		padding: 22,
		shadowColor: "#000",
		shadowOpacity: 0.06,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 4 },
		elevation: 2,
	},
	formTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.text,
		marginBottom: 18,
		textAlign: "center",
	},
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: Colors.textSub,
		marginBottom: 6,
	},
	input: {
		borderWidth: 1.5,
		borderColor: Colors.border,
		borderRadius: 14,
		paddingHorizontal: 16,
		paddingVertical: 14,
		fontSize: 20,
		fontWeight: "700",
		color: Colors.text,
		backgroundColor: Colors.grayBg,
	},
	inputError: {
		borderColor: Colors.danger,
	},
	hint: {
		fontSize: 12,
		color: Colors.textMuted,
		marginTop: 8,
	},
	errorText: {
		fontSize: 13,
		color: Colors.danger,
		marginTop: 8,
		fontWeight: "600",
	},
	loginButtonWrapper: {
		marginTop: 22,
		borderRadius: 16,
		overflow: "hidden",
	},
	loginButton: {
		paddingVertical: 16,
		alignItems: "center",
		borderRadius: 16,
	},
	loginButtonText: {
		color: Colors.white,
		fontSize: 17,
		fontWeight: "700",
	},
	decoration: {
		alignItems: "center",
		paddingBottom: 20,
	},
	storeBuilding: {
		alignItems: "center",
		backgroundColor: Colors.primaryLight,
		width: "100%",
		paddingVertical: 24,
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		gap: 6,
	},
	storeText: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.primary,
		letterSpacing: 1,
	},
});

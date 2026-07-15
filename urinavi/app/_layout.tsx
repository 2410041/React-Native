import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AppProvider } from '@/context/AppContext';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export const unstable_settings = {
	anchor: 'index',
};

export default function RootLayout() {
	useEffect(() => {
		SplashScreen.hideAsync().catch(() => undefined);
	}, []);

	return (
		<AppProvider>
			<ThemeProvider value={DefaultTheme}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen name="login" />
					<Stack.Screen name="home" />
					<Stack.Screen name="search" />
					<Stack.Screen name="barcode" />
					<Stack.Screen name="product/[id]" />
					<Stack.Screen name="map/[id]" />
					<Stack.Screen name="map/store" />
					<Stack.Screen name="history" />
					<Stack.Screen name="price-revision/index" />
					<Stack.Screen name="price-revision/result" />
					<Stack.Screen name="price-revision/[id]" />
					<Stack.Screen name="department" />
					<Stack.Screen name="notifications" />
					<Stack.Screen name="menu" />
					<Stack.Screen name="employee" />
					<Stack.Screen name="store" />
					<Stack.Screen name="settings" />
					<Stack.Screen name="help" />
					<Stack.Screen name="about" />
				</Stack>
				<StatusBar style="light" />
			</ThemeProvider>
		</AppProvider>
	);
}

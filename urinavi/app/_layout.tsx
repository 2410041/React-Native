import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="home" />
        <Stack.Screen name="search" />
        <Stack.Screen name="barcode" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="map/[id]" />
        <Stack.Screen name="task" />
        <Stack.Screen name="history" />
        <Stack.Screen name="menu" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

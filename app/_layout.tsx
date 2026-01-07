import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast, { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import { useTheme } from '../hooks/useTheme';

export default function RootLayout() {
  const { isDark, theme } = useTheme();

  const toastConfig: ToastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftWidth: 0,
          backgroundColor: theme.colors.card,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          color: theme.colors.text,
          fontWeight: '600',
          fontSize: theme.typography.fontSizes.m,
        }}
        text2Style={{
          color: theme.colors.textSecondary,
          fontWeight: '600',
          fontSize: theme.typography.fontSizes.m,
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftWidth: 0,
          backgroundColor: theme.colors.card,
        }}
        text1Style={{
          color: theme.colors.text,
          fontWeight: '600',
          fontSize: theme.typography.fontSizes.m,
        }}
        text2Style={{
          color: theme.colors.textSecondary,
          fontWeight: '600',
          fontSize: theme.typography.fontSizes.m,
        }}
      />
    ),
  };

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig} />
    </>
  );
}


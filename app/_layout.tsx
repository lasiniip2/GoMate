import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { FavouritesProvider } from '@/context/FavouritesContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const currentAuthScreen = segments[1]; // 'login' or 'signup'

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Allow navigation between login and signup pages
      // Only redirect to home if not on a specific auth screen
      if (!currentAuthScreen) {
        router.replace('/(main)/(tabs)/home');
      }
      // If user is on login or signup, don't redirect - they might want to switch accounts
    }
  }, [isAuthenticated, isLoading, segments]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavouritesProvider>
          <ThemedNavigationProvider />
        </FavouritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function ThemedNavigationProvider() {
  const { theme } = useTheme();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootLayoutNav />
    </NavigationThemeProvider>
  );
}

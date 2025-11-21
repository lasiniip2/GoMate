import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="destination-details" options={{ presentation: 'modal' }} />
      <Stack.Screen name="route-details" options={{ presentation: 'modal' }} />
      <Stack.Screen name="schedule-details" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="select-game" />
      <Stack.Screen name="select-mode" />
      <Stack.Screen name="lobby" />
      <Stack.Screen name="searching" />
    </Stack>
  );
}
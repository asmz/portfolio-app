import { Stack } from 'expo-router/stack'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: 'Slide',
        }}
      />
      <Stack.Screen
        name="viewer"
        options={{
          headerShown: true,
          headerTitle: 'Slide Viewer',
        }}
      />
    </Stack>
  )
}

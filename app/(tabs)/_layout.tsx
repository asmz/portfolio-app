import { ACCENT_COLOR } from '#/constants/environment'
import { FontAwesome } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: ACCENT_COLOR }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome size={24} name={'user'} />,
          tabBarLabel: 'Profile',
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          headerShown: true,
          tabBarIcon: () => <FontAwesome size={24} name={'pencil-square-o'} />,
          tabBarLabel: 'Posts',
          headerTitle: 'Posts',
        }}
      />
    </Tabs>
  )
}

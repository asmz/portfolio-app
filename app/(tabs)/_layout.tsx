import { FontAwesome } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#f94' }}>
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
          headerShown: false,
          tabBarIcon: () => <FontAwesome size={24} name={'pencil-square-o'} />,
          tabBarLabel: 'Posts',
        }}
      />
    </Tabs>
  )
}

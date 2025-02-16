import { COLORS } from '#/constants/environment'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.accent }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome size={24} name={'user'} />,
          tabBarLabel: 'Profile',
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          headerShown: true,
          tabBarIcon: () => <FontAwesome size={24} name={'pencil-square-o'} />,
          tabBarLabel: 'Blog',
          headerTitle: 'Blog',
        }}
      />
      <Tabs.Screen
        name="slide"
        options={{
          headerShown: false,
          tabBarIcon: () => <MaterialCommunityIcons size={24} name={'presentation'} />,
          tabBarLabel: 'Slide',
          headerTitle: 'Slide',
        }}
      />
    </Tabs>
  )
}

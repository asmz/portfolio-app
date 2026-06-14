import { COLORS } from '#/constants/colors'
import { FontAwesome } from '@react-native-vector-icons/fontawesome'
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons'
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
          tabBarIcon: () => <MaterialDesignIcons size={24} name={'presentation'} />,
          tabBarLabel: 'Slide',
          headerTitle: 'Slide',
        }}
      />
    </Tabs>
  )
}

import { StatusBar } from 'expo-status-bar'
import { ReactNode } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'

type Props = {
  children: ReactNode
}

export const GlobalLayout = ({ children }: Props) => (
  <View style={styles.container}>
    <ImageBackground source={require('#assets/beer.jpg')} style={styles.background}>
      <StatusBar style="auto" />
      {children}
    </ImageBackground>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
})

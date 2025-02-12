import { PostList } from '#/components'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground, StyleSheet, View } from 'react-native'

export const SlideScreen = () => (
  <View style={styles.container}>
    <ImageBackground source={require('#assets/beer.jpg')} style={styles.background}>
      <StatusBar style="auto" />
      <PostList tag="slide" />
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

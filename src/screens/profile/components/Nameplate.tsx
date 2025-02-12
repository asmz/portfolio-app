import { COLORS } from '#/constants/environment'
import { Image, StyleSheet, Text, View } from 'react-native'

export const Nameplate = () => (
  <View style={styles.container}>
    <Image source={require('#assets/avatar.jpg')} style={styles.avatar} />
    <Text style={styles.title}>asmz</Text>
    <Text style={styles.description}>Akira Shimizu</Text>
    <Text style={styles.description}>純東北産麦芽系エンジニア</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150,
    paddingBottom: 50,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    color: COLORS.text,
  },
  description: {
    fontSize: 16,
    padding: 20,
    color: COLORS.text,
  },
})

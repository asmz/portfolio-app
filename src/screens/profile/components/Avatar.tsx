import { Image, StyleSheet } from 'react-native'

export const Avatar = () => {
  return <Image source={require('#assets/avatar.jpg')} style={styles.avatar} />
}

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
})

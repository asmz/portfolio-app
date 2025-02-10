import { PostProps } from '#/types'
import { useCallback } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  post: PostProps
}

export const PostItem = ({ post }: Props) => {
  const onPress = useCallback(() => {
    console.log(post)
  }, [post])

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContainer}>
        {post.content[0].poster ? (
          <Image source={{ uri: post.content[0].poster[0].url }} style={styles.thumbnail} />
        ) : null}
        <Text>{post.content[0].title}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text>{post.content[0].title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 54,
    width: '75%',
    borderRadius: 15,
    marginVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    backgroundColor: '#eeea',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 0,
    alignItems: 'center',
    marginEnd: 8,
  },
  thumbnail: {
    height: 64,
    width: 80,
    marginEnd: 16,
  },
})

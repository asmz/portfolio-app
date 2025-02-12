import { COLORS } from '#/constants/environment'
import { PostProps } from '#/types'
import { useCallback } from 'react'
import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

type Props = {
  post: PostProps
}

export const PostItem = ({ post }: Props) => {
  const content = post.content[0]
  const poster = content.poster?.[0]
  const hostname = new URL(content.url).hostname

  const onPress = useCallback(() => {
    if (Platform.OS === 'web') {
      Linking.openURL(content.url)
    } else {
      const options: WebBrowser.WebBrowserOpenOptions = {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
      }
      WebBrowser.openBrowserAsync(content.url, options)
    }
  }, [content])

  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <View style={styles.contentContainer}>
        {/* サムネイル画像 */}
        <View style={styles.leftContainer}>
          {poster ? (
            <Image source={{ uri: poster.url }} style={styles.thumbnail} resizeMode="contain" />
          ) : (
            <Image
              source={require('#assets/no_image.jpg')}
              style={styles.thumbnail}
              resizeMode="contain"
            />
          )}
        </View>
        {/* 記事タイトル */}
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{content.title}</Text>
          <Text style={styles.subtitle}>{hostname}</Text>
        </View>
      </View>
      {/* タグエリア */}
      <View style={styles.tagsContainer}>
        {post.tags.map((tag) => (
          <Text key={tag} style={styles.tag}>
            #{tag}
          </Text>
        ))}
      </View>
      {/* フッター */}
      <View style={styles.border} />
      <Text style={styles.subtitle}>
        {new Date(post.timestamp * 1000).toLocaleDateString('ja-JP')}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 8,
    marginHorizontal: 8,
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: COLORS.blurGray,
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  leftContainer: {
    width: 'auto',
    height: 'auto',
  },
  rightContainer: {
    flex: 1,
    marginStart: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 112,
    height: 88,
    marginEnd: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.subText,
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    marginVertical: 16,
  },
  tag: {
    fontSize: 14,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
    color: COLORS.text,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginEnd: 4,
  },
})

import { GlobalLayout, PostList } from '#/components'
import { COLORS } from '#/constants/environment'
import { useApiSlideViewer } from '#/hooks/useApiSlideViewer'
import { useErrorHandler } from '#/hooks/useErrorHandler'
import { PostProps } from '#/types'
import { useRouter } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { ActivityIndicator, Linking, Platform, StyleSheet, View } from 'react-native'

export const SlideScreen = () => {
  const router = useRouter()
  const {
    values: { isLoading },
    handlers: { fetchViewerUrl },
  } = useApiSlideViewer()

  const onPressItem = useCallback(
    async (post: PostProps) => {
      const url = post.content[0].url
      if (Platform.OS === 'web') {
        Linking.openURL(url)
        return
      }

      const viewerUrl = await fetchViewerUrl(url)
      if (viewerUrl) {
        router.push({ pathname: '/slide/viewer', params: { url: viewerUrl } })
      } else {
        Linking.openURL(url)
      }
    },
    [router, fetchViewerUrl]
  )

  return (
    <GlobalLayout>
      <PostList tag="slide" onPressItem={onPressItem} />
      {isLoading && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={'large'} style={styles.indicator} color={COLORS.accent} />
        </View>
      )}
    </GlobalLayout>
  )
}

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: '#ddde',
    padding: 16,
    borderRadius: 5,
  },
})

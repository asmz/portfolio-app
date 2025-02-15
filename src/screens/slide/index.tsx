import { GlobalLayout, PostList } from '#/components'
import { useApiSlideViewer } from '#/hooks/useApiSlideViewer'
import { PostProps } from '#/types'
import { useRouter } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { Linking } from 'react-native'

export const SlideScreen = () => {
  const router = useRouter()
  const {
    values: { isLoading, error },
    handlers: { fetch },
  } = useApiSlideViewer()

  const onPressItem = useCallback(
    async (post: PostProps) => {
      const url = post.content[0].url
      const viewerUrl = await fetch(post.content[0].url)

      if (viewerUrl) {
        router.navigate({ pathname: '/slideview', params: { url: viewerUrl } })
      } else {
        Linking.openURL(url)
      }
    },
    [router]
  )

  return (
    <GlobalLayout>
      <PostList tag="slide" onPressItem={onPressItem} />
    </GlobalLayout>
  )
}

import { GlobalLayout, PostList } from '#/components'
import { useApiSlideViewer } from '#/hooks/useApiSlideViewer'
import { PostProps } from '#/types'
import { useRouter } from 'expo-router'
import { useCallback, useEffect } from 'react'

export const SlideScreen = () => {
  const router = useRouter()
  const {
    values: { viewerUrl, isLoading, error },
    handlers: { fetch },
  } = useApiSlideViewer()

  const onPressItem = useCallback(
    async (post: PostProps) => {
      await fetch(post.content[0].url)
      //router.navigate('/slideview')
    },
    [router]
  )

  useEffect(() => {
    console.log(viewerUrl)
  }, [viewerUrl])

  return (
    <GlobalLayout>
      <PostList tag="slide" onPressItem={onPressItem} />
    </GlobalLayout>
  )
}

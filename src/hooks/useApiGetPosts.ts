import { useState, useCallback, useRef } from 'react'
import { TUMBLR_API_END_POINT } from '#/constants/environment'
import { PostProps, PostResponse } from '#/types'
import { apiClient } from '#/api/apiClient'

const LIMIT = 20

export const useApiGetPosts = (tag: string) => {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const offsetRef = useRef(0)
  const hasNextRef = useRef(true)

  const loadMore = useCallback(async () => {
    if (!hasNextRef.current || isLoading) return

    setIsLoading(true)

    try {
      const params = {
        offset: offsetRef.current,
        limit: LIMIT,
        tag,
        npf: true,
      }
      const result = await apiClient<PostResponse>({
        url: TUMBLR_API_END_POINT,
        params,
      })

      if (result) {
        setPosts((prev) => prev.concat(result.response.posts))
        offsetRef.current += LIMIT
        hasNextRef.current =
          result.response.total_posts > posts.length + result.response.posts.length
      } else {
        setPosts([])
        hasNextRef.current = false
      }
    } catch (err) {
      setError(err as Error)
      hasNextRef.current = false
    } finally {
      setIsLoading(false)
    }
  }, [offsetRef, hasNextRef, isLoading, posts])

  const refresh = useCallback(async () => {
    setIsRefreshing(true)

    offsetRef.current = 0
    hasNextRef.current = true
    setPosts([])
    await loadMore()

    setIsRefreshing(false)
  }, [loadMore])

  return {
    values: { posts, isLoading, error, isRefreshing },
    handlers: { refresh, loadMore },
  }
}

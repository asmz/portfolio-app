import { useState, useEffect, useCallback, useRef } from 'react'
import { TUMBLR_API_END_POINT } from '#/constants/environment'
import { PostProps, PostResponse } from '#/types'
import { apiClient } from '#/api/apiClient'

const LIMIT = 20

export const useApiGetPosts = () => {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [hasNext, setHasNext] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const offsetRef = useRef(0)

  const loadMore = useCallback(async () => {
    if (!hasNext || isLoading) return

    setIsLoading(true)

    try {
      const params = {
        offset: offsetRef.current,
        limit: LIMIT,
        npf: true,
      }
      const result = (await apiClient({
        url: TUMBLR_API_END_POINT,
        params,
      })) as PostResponse

      if (result) {
        setHasNext(result.response.total_posts > posts.length + result.response.posts.length)
        setPosts((prev) => prev.concat(result.response.posts))
        offsetRef.current += LIMIT
      } else {
        setPosts([])
        setHasNext(false)
      }
    } catch (err) {
      setError(err as Error)
      setHasNext(false)
    } finally {
      setIsLoading(false)
    }
  }, [hasNext, isLoading, posts])

  const refresh = useCallback(async () => {
    setIsRefreshing(true)

    offsetRef.current = 0
    setPosts([])
    await loadMore()

    setIsRefreshing(false)
  }, [loadMore])

  return {
    values: { posts, isLoading, error, isRefreshing },
    handlers: { refresh, loadMore },
  }
}

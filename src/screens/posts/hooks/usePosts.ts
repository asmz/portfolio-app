import { useApiClient } from '#/api/useApiClient'
import { TUMBLR_API_END_POINT } from '#/constants/environment'
import { PostProps, PostResponse } from '#/types'
import { useCallback, useEffect, useMemo, useState } from 'react'

const LIMIT = 20

export const usePosts = () => {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const { data, isLoading, error, trigger } = useApiClient<PostResponse>({
    url: TUMBLR_API_END_POINT,
    method: 'GET',
  })

  useEffect(() => {
    trigger({ limit: LIMIT, offset })
  }, [])

  useEffect(() => {
    if (data) {
      setPosts((prev) => prev.concat(data.response.posts))
    }
  }, [data])

  const hasNext = useMemo(() => {
    if (!data) return false
    return data.response.total_posts > posts.length
  }, [data, posts])

  const refresh = useCallback(async () => {
    setPosts([])
    setOffset(0)
    await trigger({ limit: LIMIT, offset: 0 })
    setIsRefreshing(false)
  }, [trigger])

  const loadMore = useCallback(async () => {
    if (!hasNext) return

    const newOffset = offset + LIMIT
    setOffset(newOffset)
    await trigger({ limit: LIMIT, offset: newOffset })
  }, [offset, hasNext, trigger])

  return {
    values: { posts, isLoading, error, isRefreshing },
    handlers: { refresh, loadMore, setIsRefreshing },
  }
}

import { useApiClient } from '#/api/useApiClient'
import { TUMBLR_API_END_POINT } from '#/constants/environment'
import { PostResponse } from '#/types'

export const usePosts = () => {
  const { data, isLoading, error } = useApiClient<PostResponse>({
    url: TUMBLR_API_END_POINT,
    params: { npf: true, limit: 5, offset: 0 },
  })

  // TODO: ページング処理など実装

  return { data, isLoading, error }
}

import { useState, useEffect, useCallback } from 'react'
import { apiClient, ApiClientProps } from './apiClient'

type UseApiClientResult<T> = {
  data: T | null
  isLoading: boolean
  error: Error | null
  trigger: (params: object) => Promise<void>
}

type Props = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export const useApiClient = <T>({ url, method = 'GET' }: Props): UseApiClientResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const trigger = useCallback(async (params: object) => {
    setIsLoading(true)
    try {
      const result = await apiClient({ url, method, params: { ...params, npf: true } })
      if (result) {
        setData(result)
      } else {
        setData(null)
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error, trigger }
}

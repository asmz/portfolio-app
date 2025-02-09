import { useState, useEffect } from 'react'
import { apiClient, ApiClientProps } from './apiClient'

type UseApiClientResult<T> = {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export const useApiClient = <T>({
  url,
  method = 'GET',
  params,
}: ApiClientProps): UseApiClientResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiClient({ url, method, params })
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
    }

    fetchData()
  }, [url])

  return { data, isLoading, error }
}

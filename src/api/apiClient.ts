export type ApiClientProps = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: object
}

const checkStatus = (response: Response) => {
  if (response.ok) {
    return response
  } else {
    throw new Error(response.statusText)
  }
}

export const apiClient = async ({ url, method = 'GET', params }: ApiClientProps) => {
  let query = ''
  let body = undefined
  if (params && method === 'GET') {
    // GETならクエリパラメータ生成
    const searchParams = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, value.toString()])
    )
    query = `?${searchParams.toString()}`
  } else {
    // GET以外ならリクエストボディ生成
    body = params ? JSON.stringify(params) : undefined
  }

  return fetch(`${url}${query}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(checkStatus)
    .then((response) => response.json())
    .catch((error) => {
      console.log('request failed', error)
    })
}

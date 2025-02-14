import { useState, useCallback } from 'react'
import { SPEAKER_DECK_API_END_POINT } from '#/constants/environment'
import { SpeakerDeckResponse } from '#/types'
import { apiClient } from '#/api/apiClient'

export const useApiSlideViewer = () => {
  const [viewerUrl, setViewerUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetch = useCallback(
    async (speakerDeckUrl: string) => {
      if (isLoading) return
      setIsLoading(true)

      try {
        const params = {
          url: speakerDeckUrl,
        }
        const result = await apiClient<SpeakerDeckResponse>({
          url: SPEAKER_DECK_API_END_POINT,
          params,
        })
        console.log('~~~~~~~~~~~~~ result', result)

        if (result) {
          setViewerUrl(extractViewerUrlFromHtml(result.html))
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading]
  )

  const extractViewerUrlFromHtml = useCallback((html: string) => {
    console.log('~~~~~~~~~~~~~ aaa')
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${html}`
    console.log('~~~~~~~~~~~~~ xml', xml)
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml, 'application/xml')
    console.log('~~~~~~~~~~~~~ doc', doc)
    const iFrameNode = doc.querySelector('iframe')
    console.log('~~~~~~~~~~~~~ iFrameNode', iFrameNode)
    const srcAttr = iFrameNode?.getAttribute('src')
    console.log('~~~~~~~~~~~~~ srcAttr', srcAttr)
    const src = doc.documentElement.querySelector('iframe')?.getAttribute('src')
    if (src) {
      return `https:${src}`
    } else {
      throw new Error('HTML parse error.')
    }
  }, [])

  return {
    values: { viewerUrl, isLoading, error },
    handlers: { fetch },
  }
}

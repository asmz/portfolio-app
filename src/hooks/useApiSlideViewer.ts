import React, { useState, useCallback } from 'react'
import { SpeakerDeckResponse } from '#/types'
import { apiClient } from '#/api/apiClient'
import { XMLParser } from 'fast-xml-parser'

export const useApiSlideViewer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchViewerUrl = useCallback(
    async (speakerDeckUrl: string) => {
      if (isLoading) return null
      setIsLoading(true)

      try {
        const params = {
          url: speakerDeckUrl,
        }
        const result = await apiClient<SpeakerDeckResponse>({
          url: process.env.EXPO_PUBLIC_SPEAKER_DECK_API_END_POINT,
          params,
        })
        if (result) {
          return extractViewerUrlFromHtml(result.html)
        }
        return null
      } catch (error) {
        console.log('Slide Viewer fetch error.', error)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading]
  )

  const extractViewerUrlFromHtml = useCallback((html: string) => {
    const parser = new XMLParser({
      ignoreAttributes: false,
    })
    const htmlObj = parser.parse(html)
    const src = htmlObj.iframe['@_src']
    if (src) {
      return src
    } else {
      throw new Error('HTML parse error.')
    }
  }, [])

  return {
    values: { isLoading },
    handlers: { fetchViewerUrl },
  }
}

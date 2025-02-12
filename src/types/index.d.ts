import { ImageSourcePropType } from 'react-native'

export type AccountProps = {
  image: ImageSourcePropType
  name: string
  url: string
}

type PostContentProps = {
  description: string
  title: string
  url: string
  poster?: {
    url: string
  }[]
}

export type PostProps = {
  id_string: string
  timestamp: number
  tags: string[]
  content: PostContentProps[]
}

export type PostResponse = {
  response: {
    posts: PostProps[]
    total_posts: number
  }
}

import { ImageSourcePropType } from 'react-native'

export type CardProps = {
  image: ImageSourcePropType
  name: string
  url: string
}

type PostContentProps = {
  description: string
  site_name: string
  title: string
  url: string
  poster: {
    url: string
  }[]
}

export type PostProps = {
  date: string
  tags: string[]
  content: PostContentProps[]
}

export type PostResponse = {
  response: {
    posts: PostProps[]
  }
}

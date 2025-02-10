import { Dimensions } from 'react-native'

export const isLandscape = () => {
  const dim = Dimensions.get('window')
  console.log(dim)
  return dim.width >= dim.height
}

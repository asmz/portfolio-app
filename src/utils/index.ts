import { Dimensions } from 'react-native'

export const isLandscape = () => {
  const dim = Dimensions.get('window')
  return dim.width >= dim.height
}

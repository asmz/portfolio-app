import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

export const useOrientation = () => {
  const dim = Dimensions.get('window')
  const [isLandscape, setIsLandscape] = useState(dim.width > dim.height)

  useEffect(() => {
    const onChangeOrientation = (event: ScreenOrientation.OrientationChangeEvent) => {
      const landscape =
        event.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        event.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT

      setIsLandscape(landscape)
    }
    ScreenOrientation.addOrientationChangeListener(onChangeOrientation)
  }, [])

  return { isLandscape }
}

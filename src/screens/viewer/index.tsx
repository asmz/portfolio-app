import { COLORS } from '#/constants/environment'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'
import WebView from 'react-native-webview'

type Params = {
  url: string
}

export const SlideViewer = () => {
  const { url } = useLocalSearchParams<Params>()

  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{
        uri: url,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.slideViewerBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

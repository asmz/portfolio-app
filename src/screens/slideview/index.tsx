import { StyleSheet } from 'react-native'
import WebView from 'react-native-webview'

type Props = {
  url: string
}

export const SlideWebView = ({ url }: Props) => {
  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{
        uri: url,
        //html: '<iframe id="talk_frame_1311687" class="speakerdeck-iframe" src="//speakerdeck.com/player/eac4d8127dbc48169b833317a9788380" width="710" height="399" style="aspect-ratio:710/399; border:0; padding:0; margin:0; background:transparent;" frameborder="0" allowtransparency="true" allowfullscreen="allowfullscreen"></iframe>\n',
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

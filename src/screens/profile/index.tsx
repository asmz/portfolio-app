import { StatusBar } from 'expo-status-bar'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { AccountList, Nameplate } from './components'
import { isLandscape } from '#/utils'

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('#assets/beer.jpg')} style={styles.background}>
        <StatusBar style="auto" />
        <ScrollView style={styles.scroll}>
          {/* プロフィール情報 */}
          <Nameplate />
          {/* 各種サービスアカウントリスト */}
          <AccountList />
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  background: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: isLandscape() ? 250 : 0,
    paddingBottom: 30,
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
})

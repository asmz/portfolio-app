import { ScrollView, StyleSheet } from 'react-native'
import { AccountList, Nameplate } from './components'
import { isLandscape } from '#/utils'
import { GlobalLayout } from '#/components'

export const ProfileScreen = () => (
  <GlobalLayout>
    <ScrollView style={styles.scroll}>
      {/* プロフィール情報 */}
      <Nameplate />
      {/* 各種サービスアカウントリスト */}
      <AccountList />
    </ScrollView>
  </GlobalLayout>
)

const styles = StyleSheet.create({
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

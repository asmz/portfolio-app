import { ScrollView, StyleSheet } from 'react-native'
import { AccountList, Nameplate } from './components'
import { GlobalLayout } from '#/components'
import { useOrientation } from '#/hooks/useOrientation'

export const ProfileScreen = () => {
  const { isLandscape } = useOrientation()

  return (
    <GlobalLayout>
      <ScrollView style={[styles.scroll, { paddingHorizontal: isLandscape ? 250 : 0 }]}>
        {/* プロフィール情報 */}
        <Nameplate />
        {/* 各種サービスアカウントリスト */}
        <AccountList />
      </ScrollView>
    </GlobalLayout>
  )
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 30,
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
})

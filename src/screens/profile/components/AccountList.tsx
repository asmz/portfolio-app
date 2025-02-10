import { ACCOUNTS } from '#/constants/accounts'
import { StyleSheet, View } from 'react-native'
import { AccountItem } from './AccountItem'

export const AccountList = () => {
  return (
    <View style={styles.container}>
      {ACCOUNTS.map((item, index) => (
        <AccountItem key={index} account={item} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
})

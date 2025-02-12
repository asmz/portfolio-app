import { useEffect } from 'react'
import { Alert, Platform } from 'react-native'

export const useErrorHandler = (error: Error | null) => {
  useEffect(() => {
    if (error) {
      if (Platform.OS === 'web') {
        alert(error.message)
      } else {
        Alert.alert('エラー', error.message)
      }
    }
  }, [error])
}

import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { usePosts } from './hooks/usePosts'

export const PostsScreen = () => {
  const { data, isLoading, error } = usePosts()

  useEffect(() => {
    if (data) {
      console.log(data.response.posts)
    }
  }, [data])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? <ActivityIndicator size={'large'} /> : <Text>This is "posts" page</Text>}
    </View>
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

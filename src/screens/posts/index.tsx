import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import { usePosts } from './hooks'
import { PostItem } from './components'
import { PostProps } from '#/types'
import { ACCENT_COLOR } from '#/constants/environment'

export const PostsScreen = () => {
  const {
    values: { posts, isLoading, error, isRefreshing },
    handlers: { refresh, loadMore, setIsRefreshing },
  } = usePosts()

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'web') {
        alert(error.message)
      } else {
        Alert.alert('エラー', error.message)
      }
    }
  }, [error])

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<PostProps>) => <PostItem post={item} />,
    []
  )
  const keyExtractor = useCallback((item: PostProps) => item.id_string, [])
  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    refresh()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        onEndReached={loadMore}
      />
      {isLoading && (
        <ActivityIndicator size={'large'} style={styles.indicator} color={ACCENT_COLOR} />
      )}
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
  indicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
})

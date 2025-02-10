import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
import { usePosts } from './hooks'
import { PostItem } from './components'
import { PostProps } from '#/types'
import { COLORS } from '#/constants/environment'
import { isLandscape } from '#/utils'

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
      <ImageBackground source={require('#assets/beer.jpg')} style={styles.background}>
        <StatusBar style="auto" />
        <FlatList
          contentContainerStyle={styles.list}
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          onEndReached={loadMore}
        />
        {isLoading && (
          <ActivityIndicator size={'large'} style={styles.indicator} color={COLORS.accent} />
        )}
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
  },
  background: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: isLandscape() ? 250 : 0,
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
})

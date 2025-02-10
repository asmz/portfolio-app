import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'
import { PostItem } from './components'
import { PostProps } from '#/types'
import { COLORS } from '#/constants/environment'
import { isLandscape } from '#/utils'
import { useApiGetPosts } from './hooks'

export const PostsScreen = () => {
  const {
    values: { posts, isLoading, error, isRefreshing },
    handlers: { refresh, loadMore },
  } = useApiGetPosts()

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
  const listFooterComponent = useCallback(() => {
    if (isLoading && !isRefreshing) {
      return <ActivityIndicator size={'large'} style={styles.indicator} color={COLORS.accent} />
    } else {
      return <View style={styles.indicator} />
    }
  }, [isLoading, isRefreshing])
  const keyExtractor = useCallback((item: PostProps) => item.id_string, [])
  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isLoading && isRefreshing}
        onRefresh={refresh}
        tintColor={COLORS.accent}
        colors={[COLORS.accent]}
      />
    ),
    [isLoading, refresh]
  )

  return (
    <View style={styles.container}>
      <ImageBackground source={require('#assets/beer.jpg')} style={styles.background}>
        <StatusBar style="auto" />
        <FlatList
          contentContainerStyle={styles.list}
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={loadMore}
          ListFooterComponent={listFooterComponent}
          refreshControl={refreshControl}
        />
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
    paddingHorizontal: isLandscape() ? 250 : 8,
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
})

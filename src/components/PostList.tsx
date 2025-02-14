import { useCallback, useEffect, useMemo } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'
import { PostProps } from '#/types'
import { COLORS } from '#/constants/environment'
import { isLandscape } from '#/utils'
import { useApiGetPosts } from '#/hooks'
import { useErrorHandler } from '#/hooks/useErrorHandler'
import { PostItem } from './PostItem'

type Props = {
  tag: 'blog' | 'slide'
  onPressItem?: (post: PostProps) => void
}

export const PostList = ({ tag, onPressItem }: Props) => {
  const {
    values: { posts, isLoading, error, isRefreshing },
    handlers: { refresh, loadMore },
  } = useApiGetPosts(tag)

  useErrorHandler(error)

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<PostProps>) => <PostItem post={item} onPressItem={onPressItem} />,
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
    [isLoading, isRefreshing, refresh]
  )

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={posts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={loadMore}
      ListFooterComponent={listFooterComponent}
      refreshControl={refreshControl}
    />
  )
}

const styles = StyleSheet.create({
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

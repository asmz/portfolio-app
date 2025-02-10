import { CardProps } from '#/types'
import { useCallback } from 'react'
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { COLORS } from '#/constants/environment'

type Props = {
  card: CardProps
}

export const Card = ({ card }: Props) => {
  const onPress = useCallback(() => {
    Linking.openURL(card.url)
  }, [card])

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContainer}>
        <Image source={card.image} style={styles.icon} />
        <Text style={styles.text}>{card.name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <FontAwesome size={16} name={'external-link'} color={COLORS.subText} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 54,
    width: '75%',
    borderRadius: 15,
    marginVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    backgroundColor: COLORS.blurGray,
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 0,
    alignItems: 'center',
    marginEnd: 8,
  },
  icon: {
    height: 32,
    width: 32,
    marginEnd: 16,
  },
  text: {
    color: COLORS.text,
  },
})

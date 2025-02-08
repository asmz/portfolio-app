import { StatusBar } from 'expo-status-bar'
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Avatar, Card } from './components'
import { cards } from '#/constants/cards'

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('#assets/beer.jpg')} style={styles.background}>
        <StatusBar style="auto" />
        <ScrollView style={styles.scroll}>
          <View style={styles.headerContainer}>
            <Avatar />
            <Text style={styles.title}>asmz</Text>
            <Text style={styles.description}>Akira Shimizu</Text>
            <Text style={styles.description}>純東北産麦芽系エンジニア</Text>
          </View>
          <View style={styles.listContainer}>
            {cards.map((item, index) => (
              <Card key={index} card={item} />
            ))}
          </View>
        </ScrollView>
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
    width: '100%',
  },
  background: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  scroll: {
    width: '100%',
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150,
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  description: {
    fontSize: 16,
    padding: 20,
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
})

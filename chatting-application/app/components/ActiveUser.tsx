import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { COLORS } from '../utils/colors'
import { navigate } from '../utils/navigationService'
import { SCREENS } from '../utils/routes'
import ButtonWithLabel from './ButtonWithLabel'

interface User {
  name: string
  email: string
  image?: string
  _id: string
}

interface ActiveUserProps {
  item: User
}

const ActiveUser: React.FC<ActiveUserProps> = ({ item }) => {

  const handlePress = (): void => {
    console.log("Chat pressed for:", item.name)
    navigate(SCREENS.RequestChatRoom, {
      name: item?.name,
      receiverId: item?._id
    })
  }

  return (
    <View style={styles.userContainer}>
      <Image
        source={{
          uri:
            item.image ||
            'https://cdn-icons-png.flaticon.com/128/149/149071.png',
        }}
        style={styles.profileImage}
      />

      <View>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.emailText}>{item.email}</Text>
      </View>

      <View style={styles.chatButton}>
        <ButtonWithLabel title="chat" onPress={handlePress} />
      </View>
    </View>
  )
}

export default ActiveUser

const styles = StyleSheet.create({
  profileImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    resizeMode: 'contain',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(10),
    marginVertical: scale(5),
    borderColor: COLORS.grey,
    borderWidth: 2,
    padding: scale(10),
    borderRadius: scale(15),
  },
  chatButton: {
    width: scale(100),
  },
  nameText: {
    fontSize: scale(12),
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: scale(12),
  },
})
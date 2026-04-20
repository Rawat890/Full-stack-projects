import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useContext, useLayoutEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import InputWithLabel from '../components/InputWithLabel';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../utils/colors';

export default function RequestChatRoom() {
  const { token, userId, setToken } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const route = useRoute();
  const { name: userName, receiverId } = route?.params
  const navigation = useNavigation();

  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <SafeAreaView style={styles.header} edges={[]}>
          <Ionicons name='arrow-back' size={24} color={COLORS.black} />
          <View>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </SafeAreaView>
      )
    })
  }, [])

  const sendMessage = async () =>{
    console.log("clicked")
    try {
      const userData ={
        senderId: userId,
        receiverId: receiverId,
        message: message
      }
      const response = await axios.post("http://10.12.178.201:6000/sendRequest", userData);
      console.log("Response - ", response)
      if(response.status === 200){
        setMessage("")
        Alert.alert("Your request has been send to the user.")
      }
    } catch (error) {
      console.log("Error while sending message - ", error)
    }
  }

return (
  <SafeAreaView style={{ flex: 1 }}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <View style={{ flex: 1 }}>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 10 }}
          keyboardShouldPersistTaps="handled"
        >
        </ScrollView>

        <View style={styles.inputContainer}>
          <Entypo name="emoji-happy" size={24} />

          <View style={{ flex: 1 }}>
            <InputWithLabel
              placeholder="Enter your message...."
              value={message}
              onChangeText={setMessage}
            />
          </View>

          <Feather name="mic" size={24} />
          <AntDesign name="camera" size={24} color="black" />

          <Feather
            name="send"
            size={24}
            color={COLORS.blue}
            onPress={sendMessage}
          />
        </View>

      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
)
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginVertical: scale(10)
  },
  userName: {
    fontSize: scale(14)
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
    marginHorizontal: scale(10)
  }
})
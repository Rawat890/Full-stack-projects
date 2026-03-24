import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { AuthContext } from '../context/AuthContext';
import { useSocketContext } from '../context/SocketContext';
import { COLORS } from '../utils/colors';
import { goBack } from '../utils/navigationService';

const ChatRoom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const { userId } = useContext(AuthContext);
  const { socket } = useSocketContext();
  const route = useRoute();

  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={styles.headerView}>
          <Ionicons name="arrow-back" size={24} color="black" onPress={goBack}/>
          <View>
            <Text>{route?.params?.name}</Text>
          </View>
        </View>
      ),
    });
  }, [navigation, route?.params?.name]);

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', newMessage => {
      newMessage.shouldShake = true;

      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket]);


  const sendMessage = async (senderId, receiverId) => {
    try {
      if (!message.trim()) return;
      await axios.post('http://192.168.29.24:6000/sendMessage', {
        senderId,
        receiverId,
        message,
      });

      socket.emit('sendMessage', { senderId, receiverId, message });

      setMessage('');

      setTimeout(() => {
        fetchMessages();
      }, 100);
    } catch (error) {
      console.log('Error', error);
    }
  };
  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const receiverId = route?.params?.receiverId;

      const response = await axios.get('http://192.168.29.24:6000/messages', {
        params: { senderId, receiverId },
      });

      setMessages(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  console.log('messages', messages);

  const formatTime = time => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(time).toLocaleString('en-US', options);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        {messages?.map((item, index) => {
          return (
            <Pressable
              key={item._id}
              style={[
                item?.senderId?._id === userId
                  ? styles.senderBubble
                  : styles.receiverBubble
              ]}>
              <Text style={styles.message}>{item?.message}</Text>
              <Text style={{ textAlign: "right", fontSize: 9, color: "gray", marginTop: 4 }}>{formatTime(item?.timeStamp)}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View
        style={styles.messageView}>
        <Entypo name="emoji-happy" size={24} color="gray" />

        <TextInput
          placeholder="type your message..."
          value={message}
          onChangeText={setMessage}
          style={styles.messageInput}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginHorizontal: 8,
          }}>
          <Entypo name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          onPress={() => sendMessage(userId, route?.params?.receiverId)}
          style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10)
  },
  message: {
    fontSize: scale(13),
    textAlign: "left"
  },
  messageInput: {
    flex: 1,
    height: scale(40),
    borderWidth: 1,
    borderColor: '#ddddd',
    borderRadius: scale(20),
    paddingHorizontal: scale(10),
    marginLeft: scale(10),
  },
  messageView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    marginBottom: scale(20),
  },
  sendButton: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(20),
  },
  sendText: {
    textAlign: 'center',
    color: 'white'
  },
  senderBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: scale(8),
    maxWidth: '60%',
    borderRadius: scale(7),
    margin: scale(10),
  },
  receiverBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    padding: scale(8),
    margin: scale(10),
    borderRadius: scale(7),
    maxWidth: '60%',
  },

});
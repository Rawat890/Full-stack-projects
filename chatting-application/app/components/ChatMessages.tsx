import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { AuthContext } from '../context/AuthContext';
import { navigate } from '../utils/navigationService';

interface UserItem {
  _id: string;
  name: string;
  image: string;
}

interface Message {
  _id?: string;
  message: string;
  senderId?: string;
  receiverId?: string;
  createdAt?: string;
}

interface ChatMessagesProps {
  item: UserItem;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ item }) => {
  const { userId } = useContext(AuthContext) as { userId: string };

  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async (): Promise<void> => {
    try {
      const senderId = userId;
      const receiverId = item?._id;

      const response = await axios.get<Message[]>(
        'http://localhost:8000/messages',
        {
          params: { senderId, receiverId },
        }
      );

      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const getLastMessage = (): Message | undefined => {
    return messages[messages.length - 1];
  };

  const lastMessage = getLastMessage();

  return (
    <Pressable
      onPress={() =>
        navigate('ChatRoom', {
          name: item?.name,
          receiverId: item?._id,
          image: item?.image,
        })
      }
      style={{ marginVertical: 15 }}
    >
      <View style={styles.imageView}>
        <Pressable>
          <Image
            source={{ uri: item?.image }}
            style={styles.image}
          />
        </Pressable>

        <View>
          <Text style={styles.userName}>
            {item?.name}
          </Text>
          <Text style={{ marginTop: 4, color: 'gray' }}>
            {lastMessage
              ? lastMessage.message
              : `Start chat with ${item?.name}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  userName: {
    fontSize: scale(15),
    fontWeight: '500'
  },
  image: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20)
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10)
  }
});
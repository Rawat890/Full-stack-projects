import 'core-js/stable/atob';
import { useContext, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AntDesign, Entypo, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import ChatMessages from '../components/ChatMessages';
import { AuthContext } from '../context/AuthContext';
import { navigate } from '../utils/navigationService';
import { SCREENS } from '../utils/routes';

const Chats = () => {
  const [options, setOptions] = useState(['Chats']);
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);
  const { token, setToken, setUserId, userId } = useContext(AuthContext);
  const chooseOption = option => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken('');
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      setToken(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  useEffect(() => {
    if (userId) {
      getrequests();
    }
  }, [userId]);
  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getrequests = async () => {
    try {
      const response = await axios.get(
        `http://10.114.23.208:6000/getrequests/${userId}`,
      );

      setRequests(response.data);
      console.log("Requests - ", response)
    } catch (error) {
      console.log('error', error);
    }
  };

  const acceptRequest = async requestId => {
    try {
      const response = await axios.post('http://10.114.23.208:6000/acceptrequest', {
        userId: userId,
        requestId: requestId,
      });

      if (response.status == 200) {
        await getrequests();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const getUser = async () => {
    try {
      const response = await axios.get(`http://10.114.23.208:6000/user/${userId}`);
      setChats(response.data);
    } catch (error) {
      console.log('Error fetching user', error);
      throw error;
    }
  };

  console.log('users', chats);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={styles.container}>
        <Pressable onPress={logout}>
          <SimpleLineIcons name="logout" size={24} color="black" />
        </Pressable>
        <Text style={styles.chatText}>Chats</Text>

        <View>
          <View style={styles.iconsView}>
            <AntDesign name="camera" size={24} color="black" />
            <MaterialIcons
              onPress={() => navigate(SCREENS.Peoples)}
              name="person-outline"
              size={26}
              color="black"
            />
          </View>
        </View>
      </View>

      <View style={{ padding: 10 }}>
        <Pressable
          onPress={() => chooseOption('Chats')}
          style={styles.chatButton}>
          <View>
            <Text>Chats</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </Pressable>

        <View>
          {options?.includes('Chats') &&
            (chats?.length > 0 ? (
              <View>
                {chats?.map((item, index) => (
                  <ChatMessages item={item} key={item?._id} />
                ))}
              </View>
            ) : (
              <View
                style={styles.noChatView}>
                <View>
                  <Text style={{ textAlign: 'center', color: 'gray' }}>
                    No Chats yet
                  </Text>
                  <Text style={{ marginTop: 4, color: 'gray' }}>
                    Get started by messaging a friend
                  </Text>
                </View>
              </View>
            ))}
        </View>

        <Pressable
          onPress={() => chooseOption('Requests')}
          style={styles.requestsButton}>
          <View>
            <Text>Requests</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </Pressable>

        <View style={{ marginVertical: 12 }}>
          {options?.includes('Requests') && (
            <View>
              <Text style={{ fontSize: 15, fontWeight: '500' }}>
                Checkout all the requests
              </Text>

              {requests?.map((item, index) => (
                <Pressable style={{ marginVertical: 12 }} key={item}>
                  <View
                    style={styles.userImageView}>
                    <Pressable>
                      <Image
                        source={{ uri: item?.from?.image }}
                        style={{ width: 40, height: 40, borderRadius: 20 ,resizeMode: 'contain'}}
                      />
                    </Pressable>

                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: '500' }}>
                        {item?.from?.name}
                      </Text>

                      <Text style={{ marginTop: 4, color: 'gray' }}>
                        {item?.message}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => acceptRequest(item?.from?._id)}
                      style={{
                        padding: 8,
                        backgroundColor: '#005187',
                        width: 75,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          textAlign: 'center',
                          color: 'white',
                        }}>
                        Accept
                      </Text>
                    </Pressable>

                    <AntDesign name="delete" size={26} color="red" />
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    justifyContent: 'space-between',
  },
  chatText: {
    fontSize: scale(16),
    fontWeight: '500'
  },
  iconsView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10)
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requestsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noChatView: {
    height: scale(280),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImageView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  }
});
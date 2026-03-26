import 'core-js/stable/atob';
import { useContext, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { COLORS } from '../utils/colors';
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
  const logout = () => clearAuthToken();
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

  useEffect(() => { if (userId) getrequests(); }, [userId]);
  useEffect(() => { if (userId) getUser(); }, [userId]);

  const getrequests = async () => {
    try {
      const response = await axios.get(`http://192.168.29.24:6000/getrequests/${userId}`);
      setRequests(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const acceptRequest = async requestId => {
    try {
      const response = await axios.post('http://192.168.29.24:6000/acceptrequest', {
        userId,
        requestId,
      });
      if (response.status === 200) await getrequests();
    } catch (error) {
      console.log('error', error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`http://192.168.29.24:6000/user/${userId}`);
      setChats(response.data);
    } catch (error) {
      console.log('Error fetching user', error);
    }
  };

  const chatsOpen = options.includes('Chats');
  const requestsOpen = options.includes('Requests');

  return (
    <SafeAreaView style={styles.safe}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={logout}>
          <SimpleLineIcons name="logout" size={16} color={COLORS.muted} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Chats</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <AntDesign name="camera" size={16} color={COLORS.muted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconBtn, styles.iconBtnAccent]}
            onPress={() => navigate(SCREENS.Peoples)}
          >
            <MaterialIcons name="person-outline" size={18} color={COLORS.accent} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <Pressable onPress={() => chooseOption('Chats')} style={styles.sectionHeader}>
          <View style={styles.sectionLeft}>
            <View style={[styles.sectionDot, { backgroundColor: COLORS.green }]} />
            <Text style={styles.sectionTitle}>Chats</Text>
            {chats.length > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{chats.length}</Text>
              </View>
            )}
          </View>
          <Entypo
            name={chatsOpen ? 'chevron-small-up' : 'chevron-small-down'}
            size={22}
            color={COLORS.muted}
          />
        </Pressable>

        {chatsOpen && (
          <View style={styles.sectionBody}>
            {chats?.length > 0 ? (
              chats.map((item) => (
                <ChatMessages item={item} key={item?._id} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>💬</Text>
                <Text style={styles.emptyTitle}>No chats yet</Text>
                <Text style={styles.emptySub}>Get started by messaging a friend</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.divider} />

        {/* ── Requests section ── */}
        <Pressable onPress={() => chooseOption('Requests')} style={styles.sectionHeader}>
          <View style={styles.sectionLeft}>
            <View style={[styles.sectionDot, { backgroundColor: COLORS.accent }]} />
            <Text style={styles.sectionTitle}>Requests</Text>
            {requests.length > 0 && (
              <View style={[styles.countBadge, { backgroundColor: COLORS.accentSoft, borderColor: COLORS.accent + '40' }]}>
                <Text style={[styles.countBadgeText, { color: COLORS.accent }]}>{requests.length}</Text>
              </View>
            )}
          </View>
          <Entypo
            name={requestsOpen ? 'chevron-small-up' : 'chevron-small-down'}
            size={22}
            color={COLORS.muted}
          />
        </Pressable>

        {requestsOpen && (
          <View style={styles.sectionBody}>
            {requests.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>📭</Text>
                <Text style={styles.emptyTitle}>No requests</Text>
                <Text style={styles.emptySub}>Friend requests will appear here</Text>
              </View>
            ) : (
              <>
                <Text style={styles.requestsLabel}>Pending requests</Text>
                {requests.map((item, index) => (
                  <View key={item?._id ?? index} style={styles.requestCard}>
                    <Image
                      source={{ uri: item?.from?.image }}
                      style={styles.requestAvatar}
                      resizeMode="cover"
                    />

                    <View style={styles.requestInfo}>
                      <Text style={styles.requestName}>{item?.from?.name}</Text>
                      <Text style={styles.requestMessage} numberOfLines={1}>
                        {item?.message}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={() => acceptRequest(item?.from?._id)}
                    >
                      <Text style={styles.acceptBtnText}>Accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.declineBtn}>
                      <AntDesign name="close" size={14} color={COLORS.danger} />
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: scale(8),
    alignItems: 'center',
  },
  iconBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnAccent: {
    backgroundColor: COLORS.accentSoft,
    borderColor: COLORS.accent + '40',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: scale(40) },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  sectionDot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(4),
  },
  sectionTitle: {
    fontSize: scale(13),
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  countBadge: {
    backgroundColor: COLORS.greenSoft,
    borderRadius: scale(10),
    paddingHorizontal: scale(7),
    paddingVertical: scale(2),
    borderWidth: 1,
    borderColor: COLORS.green + '40',
  },
  countBadgeText: {
    fontSize: scale(10),
    fontWeight: '700',
    color: COLORS.green,
  },

  sectionBody: {
    paddingHorizontal: scale(12),
    paddingBottom: scale(8),
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: scale(16),
    marginVertical: scale(4),
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingVertical: scale(36),
    gap: scale(6),
  },
  emptyEmoji: { fontSize: scale(36) },
  emptyTitle: { fontSize: scale(15), fontWeight: '700', color: COLORS.text },
  emptySub: { fontSize: scale(13), color: COLORS.muted, textAlign: 'center' },

  // Requests
  requestsLabel: {
    fontSize: scale(11),
    color: COLORS.muted,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: scale(10),
    marginLeft: scale(4),
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: scale(12),
    marginBottom: scale(10),
    gap: scale(10),
  },
  requestAvatar: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  requestInfo: { flex: 1 },
  requestName: {
    fontSize: scale(14),
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: scale(2),
  },
  requestMessage: {
    fontSize: scale(12),
    color: COLORS.muted,
  },
  acceptBtn: {
    backgroundColor: COLORS.accentSoft,
    borderRadius: scale(20),
    paddingHorizontal: scale(14),
    paddingVertical: scale(7),
    borderWidth: 1,
    borderColor: COLORS.accent + '50',
  },
  acceptBtnText: {
    fontSize: scale(12),
    fontWeight: '700',
    color: COLORS.accent,
  },
  declineBtn: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: COLORS.dangerSoft,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.danger + '30',
  },
});
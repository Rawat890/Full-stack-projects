import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../utils/colors';

const CHANNELS = [
  {
    id: '1',
    name: 'Netflix',
    image: 'https://cdn-icons-png.flaticon.com/128/2504/2504929.png',
    text: "You're in the right place",
    date: '2:45 AM',
    dot: COLORS.accent,
  },
  {
    id: '2',
    name: 'Marc Zuckerberg',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHtsQvDUZ3Q90XuFjYvcZ-KVaDhUJcA39u-g&s',
    text: 'Anyone else watching this weekend?',
    date: '2:45 AM',
    dot: COLORS.blue,
  },
  {
    id: '3',
    name: 'Indian Cricket Team',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtic4zkoYA0BmKDTREcuxL0VWVMlP3UqBUg&s',
    text: 'Any guesses who won the Fielding medal?',
    date: '1:45 PM',
    dot: COLORS.green,
  },
  {
    id: '4',
    name: 'Cravings',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPcBoRdfwpZXICr6FFLcUDT4c22xCzTVwQj6e9lwQHTo-KZw12rZD_z4u-_595SK_EpU8&usqp=CAU',
    text: 'Fruit Platters are the best 🍓',
    date: '2:45 AM',
    dot: COLORS.orange,
  },
  {
    id: '5',
    name: 'Royal Challengers Bangalore',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDlVuzjh0-kKm1BbO5qBjeIwelK8r4DvYZ5A&s',
    text: 'Only boundaries and wickets for RCB 🏏',
    date: '2:45 AM',
    dot: COLORS.accent,
  },
];
function QuoteCard() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://quotes-api-self.vercel.app/quote');
      setQuote(res.data);
    } catch {
      setQuote({ quote: 'The secret of getting ahead is getting started.', author: 'Mark Twain' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuote(); }, []);

  return (
    <View style={styles.quoteCard}>
      <View style={styles.quoteCardHeader}>
        <Text style={styles.quoteCardLabel}>✦ QUOTE OF THE DAY</Text>
        <TouchableOpacity onPress={fetchQuote}>
          <Feather name="refresh-cw" size={13} color={COLORS.muted} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.accent} style={{ marginVertical: scale(12) }} />
      ) : (
        <>
          <Text style={styles.quoteText}>"{quote?.quote}"</Text>
          <Text style={styles.quoteAuthor}>— {quote?.author}</Text>
        </>
      )}
    </View>
  );
}

function StoryBubble({ name, image }) {
  return (
    <Pressable style={styles.storyBubble}>
      <View style={styles.storyRing}>
        <Image source={{ uri: image }} style={styles.storyImage} />
      </View>
      <Text style={styles.storyName} numberOfLines={1}>{name}</Text>
    </Pressable>
  );
}

function ChannelRow({ item }) {
  return (
    <TouchableOpacity style={styles.channelRow} activeOpacity={0.75}>
      <View style={styles.channelAvatarWrap}>
        <Image source={{ uri: item.image }} style={styles.channelAvatar} />
        <View style={[styles.channelDot, { backgroundColor: item.dot }]} />
      </View>
      <View style={styles.channelInfo}>
        <Text style={styles.channelName}>{item.name}</Text>
        <Text style={styles.channelText} numberOfLines={1}>{item.text}</Text>
      </View>
      <View style={styles.channelMeta}>
        <Text style={styles.channelDate}>{item.date}</Text>
        <View style={styles.channelBadge} />
      </View>
    </TouchableOpacity>
  );
}

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        'https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.20&current_weather=true'
      );
      setWeather(res.data.current_weather);
    } catch {
      setWeather(null);
    }
  };

  useEffect(() => { fetchWeather(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWeather();
    setRefreshing(false);
  };

  const weatherIcon = () => {
    if (!weather) return '🌤';
    const code = weather.weathercode;
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 67) return '🌧';
    if (code <= 77) return '❄️';
    return '🌩';
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Updates</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Feather name="search" size={16} color={COLORS.muted} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} />
        }
      >
        {/* ── Weather strip ── */}
        {weather && (
          <View style={styles.weatherStrip}>
            <Text style={styles.weatherEmoji}>{weatherIcon()}</Text>
            <Text style={styles.weatherText}>
              {Math.round(weather.temperature)}°C · {weather.windspeed} km/h wind
            </Text>
            <View style={styles.weatherBadge}>
              <Text style={styles.weatherBadgeText}>New Delhi</Text>
            </View>
          </View>
        )}

        <QuoteCard />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Status</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesRow}
        >
          <Pressable style={styles.storyBubble}>
            <View style={[styles.storyRing, styles.myStoryRing]}>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/ogw/AF2bZyi09EC0vkA0pKVqrtBq0Y-SLxZc0ynGmNrVKjvV66i3Yg=s64-c-mo' }}
                style={styles.storyImage}
              />
              <View style={styles.addStoryBtn}>
                <AntDesign name="plus" size={9} color="#fff" />
              </View>
            </View>
            <Text style={styles.storyName}>My status</Text>
          </Pressable>

          <StoryBubble
            name="Riya"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
          />
          <StoryBubble
            name="Arjun"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
          />
          <StoryBubble
            name="Priya"
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
          />
          <StoryBubble
            name="Dev"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
          />
        </ScrollView>

        {/* ── Channels ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Channels</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Find more</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.channelsList}>
          {CHANNELS.map(item => (
            <ChannelRow key={item.id} item={item} />
          ))}
        </View>

        <View style={styles.discoverBanner}>
          <MaterialIcons name="explore" size={28} color={COLORS.accent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.discoverTitle}>Discover channels</Text>
            <Text style={styles.discoverSub}>Follow topics you care about</Text>
          </View>
          <TouchableOpacity style={styles.discoverBtn}>
            <Text style={styles.discoverBtnText}>Browse</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: scale(30) }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: scale(20),
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  searchBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: { paddingTop: scale(14) },
  weatherStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: scale(16),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: scale(14),
    paddingVertical: scale(10),
    marginBottom: scale(12),
    gap: scale(8),
  },
  weatherEmoji: { fontSize: scale(20) },
  weatherText: { flex: 1, fontSize: scale(13), color: COLORS.muted },
  weatherBadge: {
    backgroundColor: COLORS.blueSoft,
    borderRadius: scale(10),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
  },
  weatherBadgeText: { fontSize: scale(11), color: COLORS.blue, fontWeight: '600' },

  quoteCard: {
    backgroundColor: COLORS.surface,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: scale(16),
    padding: scale(16),
    marginBottom: scale(20),
  },
  quoteCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  quoteCardLabel: {
    fontSize: scale(10),
    color: COLORS.accent,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  quoteText: {
    fontSize: scale(14),
    color: COLORS.text,
    fontStyle: 'italic',
    lineHeight: scale(21),
    marginBottom: scale(8),
  },
  quoteAuthor: { fontSize: scale(12), color: COLORS.muted, fontWeight: '600' },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(18),
    marginBottom: scale(12),
  },
  sectionTitle: {
    fontSize: scale(12),
    fontWeight: '700',
    color: COLORS.muted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  sectionAction: { fontSize: scale(12), color: COLORS.accent, fontWeight: '600' },

  // Stories
  storiesRow: {
    paddingHorizontal: scale(16),
    gap: scale(16),
    marginBottom: scale(24),
  },
  storyBubble: { alignItems: 'center', width: scale(60) },
  storyRing: {
    width: scale(58),
    height: scale(58),
    borderRadius: scale(29),
    borderWidth: 2,
    borderColor: COLORS.accent,
    padding: 2,
    marginBottom: scale(5),
    position: 'relative',
  },
  myStoryRing: { borderStyle: 'dashed', borderColor: COLORS.dim },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: scale(27),
  },
  addStoryBtn: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.bg,
  },
  storyName: {
    fontSize: scale(10),
    color: COLORS.muted,
    textAlign: 'center',
  },

  channelsList: {
    marginHorizontal: scale(12),
    backgroundColor: COLORS.surface,
    borderRadius: scale(18),
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: scale(16),
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    gap: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  channelAvatarWrap: { position: 'relative' },
  channelAvatar: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
  },
  channelDot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  channelInfo: { flex: 1 },
  channelName: {
    fontSize: scale(14),
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: scale(2),
  },
  channelText: { fontSize: scale(12), color: COLORS.muted },
  channelMeta: { alignItems: 'flex-end', gap: scale(6) },
  channelDate: { fontSize: scale(11), color: COLORS.dim },
  channelBadge: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: COLORS.accent,
  },

  discoverBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    backgroundColor: COLORS.accentSoft,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: COLORS.accent + '30',
    marginHorizontal: scale(16),
    padding: scale(16),
  },
  discoverTitle: { fontSize: scale(14), fontWeight: '700', color: COLORS.text },
  discoverSub: { fontSize: scale(12), color: COLORS.muted, marginTop: scale(2) },
  discoverBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: scale(20),
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
  },
  discoverBtnText: { fontSize: scale(12), fontWeight: '700', color: '#fff' },
});
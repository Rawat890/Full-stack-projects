import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import Screen from '../components/Screen';
import { useDeleteNote, useNoteList } from '../queries/notesQuery';
import COLORS from '../utils/colors';
import { timeAgo } from '../utils/helperfunctions';

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

function NoteCard({ item, onDelete }: { item: Note; onDelete: (item: Note) => void }) {
  const scale_anim = new Animated.Value(1);

  const onPressIn = () =>
    Animated.spring(scale_anim, { toValue: 0.97, useNativeDriver: true, speed: 30 }).start();
  const onPressOut = () =>
    Animated.spring(scale_anim, { toValue: 1, useNativeDriver: true, speed: 30 }).start();

  const accents = [COLORS.accent, COLORS.green, COLORS.orange, '#60a5fa', '#f472b6'];
  const dot = accents[item.id % accents.length];

  const wordCount = item.content?.trim().split(/\s+/).filter(Boolean).length ?? 0;

  return (
    <Animated.View style={{ transform: [{ scale: scale_anim }] }}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.card}
      >
        <View style={[styles.strip, { backgroundColor: dot }]} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardContent} numberOfLines={2}>
            {item.content}
          </Text>

          <View style={styles.cardMeta}>
            <View style={styles.metaLeft}>
              <Text style={styles.metaDate}>
                {new Date(item.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </Text>
              <View style={styles.dot} />
              <Text style={styles.metaAgo}>{timeAgo(item.created_at)}</Text>
            </View>
            <View style={styles.wordBadge}>
              <Text style={styles.wordBadgeText}>{wordCount}w</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item)}>
          <MaterialIcons name="delete-sweep" size={20} color={COLORS.danger} />
        </TouchableOpacity>
      </Pressable>
    </Animated.View>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyEmoji}>📭</Text>
      <Text style={styles.emptyTitle}>No notes yet</Text>
      <Text style={styles.emptySub}>Tap the button above to capture your first thought.</Text>
      <TouchableOpacity style={styles.emptyBtn} onPress={onAdd}>
        <Text style={styles.emptyBtnText}>Create a note</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Notes() {
  const router = useRouter();
  const { data: notes, isPending } = useNoteList();
  const { mutate: deleteNote } = useDeleteNote();

  const navigateToAddNotes = () => router.push('/screens/addNotes');

  const handleDelete = (item: Note) => {
    Alert.alert('Delete note?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => deleteNote(item.id), style: 'destructive' },
    ]);
  };

  if (isPending) {
    return (
      <Screen style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Loading notes…</Text>
      </Screen>
    );
  }

  const count = notes?.length ?? 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Notes</Text>
          <Text style={styles.headerSub}>
            {count === 0 ? 'Nothing here yet' : `${count} note${count !== 1 ? 's' : ''}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={navigateToAddNotes}>
          <MaterialIcons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NoteCard item={item} onDelete={handleDelete} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          count === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={<EmptyState onAdd={navigateToAddNotes} />}
        ItemSeparatorComponent={() => <View style={{ height: scale(10) }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    gap: 12,
  },
  loadingText: {
    color: COLORS.muted,
    fontSize: scale(14),
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
    paddingBottom: scale(18),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: scale(26),
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  headerSub: {
    fontSize: scale(12),
    color: COLORS.muted,
    marginTop: 3,
  },
  addBtn: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(21),
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  listContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(14),
    paddingBottom: scale(30),
  },

  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    alignItems: 'center',
    minHeight: scale(90),
  },
  strip: {
    width: 4,
    alignSelf: 'stretch',
    borderTopLeftRadius: scale(16),
    borderBottomLeftRadius: scale(16),
  },
  cardBody: {
    flex: 1,
    paddingVertical: scale(13),
    paddingLeft: scale(13),
    paddingRight: scale(6),
  },
  cardTitle: {
    fontSize: scale(15),
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  cardContent: {
    fontSize: scale(13),
    color: COLORS.muted,
    lineHeight: scale(19),
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaDate: {
    fontSize: scale(11),
    color: COLORS.dim,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.dim,
  },
  metaAgo: {
    fontSize: scale(11),
    color: COLORS.dim,
  },
  wordBadge: {
    backgroundColor: COLORS.accentSoft,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  wordBadgeText: {
    fontSize: scale(10),
    color: COLORS.accent,
    fontWeight: '600',
  },
  deleteBtn: {
    padding: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: scale(60),
  },
  emptyEmoji: { fontSize: scale(48), marginBottom: scale(14) },
  emptyTitle: { fontSize: scale(18), fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  emptySub: {
    fontSize: scale(14),
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: scale(21),
    marginBottom: scale(24),
    paddingHorizontal: scale(30),
  },
  emptyBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: scale(22),
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
  },
  emptyBtnText: { color: '#fff', fontWeight: '700', fontSize: scale(14) },
});
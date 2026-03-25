import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Screen from '../components/Screen';
import COLORS from '../utils/colors';
import { GREETINGS, QUOTES, TIPS } from '../utils/dummyData';
import { getDayProgress, getFormattedDate } from '../utils/helperfunctions';


function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return GREETINGS[0];
  if (h < 18) return GREETINGS[1];
  return GREETINGS[2];
}

function FadeIn({ delay = 0, children, style }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 500, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}

function QuoteCard({ quote }) {
  const scale = useRef(new Animated.Value(1)).current;
  const press = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };
  return (
    <TouchableOpacity onPress={press} activeOpacity={1}>
      <Animated.View style={[styles.quoteCard, { transform: [{ scale }] }]}>
        <Text style={styles.quoteIcon}>"</Text>
        <Text style={styles.quoteText}>{quote.text}</Text>
        <Text style={styles.quoteAuthor}>— {quote.author}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

function StatPill({ icon, label, value, color }) {
  return (
    <View style={[styles.statPill, { borderColor: color + '40' }]}>
      <Text style={[styles.statIcon]}>{icon}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function DayProgressBar({ progress }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: progress, duration: 900, delay: 400, useNativeDriver: false }).start();
  }, []);
  const barWidth = anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const hour = new Date().getHours();
  const label = hour < 6 ? 'Night owl 🦉' : hour < 12 ? 'Morning ☀️' : hour < 17 ? 'Afternoon 🌤' : hour < 21 ? 'Evening 🌇' : 'Night 🌙';
  return (
    <View style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>Day progress</Text>
        <Text style={styles.progressLabel}>{label}</Text>
      </View>
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: barWidth }]} />
      </View>
      <Text style={styles.progressSub}>{Math.round(progress * 100)}% of your day has passed</Text>
    </View>
  );
}

function TipCard({ tip }) {
  return (
    <View style={styles.tipCard}>
      <Text style={styles.tipText}>{tip}</Text>
    </View>
  );
}

export default function HomeScreen({ notes = [], onNewNote }) {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [tipIndex] = useState(() => Math.floor(Math.random() * TIPS.length));
  const quote = QUOTES[quoteIndex];

  const totalNotes = notes.length;
  const todayNotes = notes.filter(n => {
    const d = new Date(n.createdAt || Date.now());
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;
  const wordsTotal = notes.reduce((acc, n) => acc + ((n.body || '').split(/\s+/).filter(Boolean).length), 0);

  const cycleQuote = () => setQuoteIndex(i => (i + 1) % QUOTES.length);

  return (
    <Screen style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0f" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <FadeIn delay={0}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{getGreeting()} ✦</Text>
              <Text style={styles.date}>{getFormattedDate()}</Text>
            </View>
            <TouchableOpacity style={styles.newBtn} onPress={onNewNote}>
              <Text style={styles.newBtnText}>+ New</Text>
            </TouchableOpacity>
          </View>
        </FadeIn>

        <FadeIn delay={80}>
          <View style={styles.statsRow}>
            <StatPill icon="📝" label="Total" value={totalNotes} color="#a78bfa" />
            <StatPill icon="🗓️" label="Today" value={todayNotes} color="#34d399" />
            <StatPill icon="✍️" label="Words" value={wordsTotal} color="#fb923c" />
          </View>
        </FadeIn>

        {/* ── Quote ── */}
        <FadeIn delay={160}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily quote</Text>
            <TouchableOpacity onPress={cycleQuote}>
              <Text style={styles.sectionAction}>Refresh ↻</Text>
            </TouchableOpacity>
          </View>
          <QuoteCard quote={quote} />
        </FadeIn>

        <FadeIn delay={240}>
          <DayProgressBar progress={getDayProgress()} />
        </FadeIn>

        <FadeIn delay={300}>
          <View style={styles.streakCard}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.streakTitle}>Keep your streak alive</Text>
              <Text style={styles.streakSub}>Write at least one note today to maintain your habit.</Text>
            </View>
            {todayNotes > 0 && (
              <View style={styles.streakBadge}>
                <Text style={styles.streakBadgeText}>✓</Text>
              </View>
            )}
          </View>
        </FadeIn>

        <FadeIn delay={360}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tip of the day</Text>
          </View>
          <TipCard tip={TIPS[tipIndex]} />
        </FadeIn>

        {notes.length > 0 && (
          <FadeIn delay={440}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent notes</Text>
            </View>
            {notes.slice(0, 3).map((note, i) => (
              <View key={note.id || i} style={styles.recentNote}>
                <Text style={styles.recentNoteTitle} numberOfLines={1}>
                  {note.title || 'Untitled'}
                </Text>
                <Text style={styles.recentNoteBody} numberOfLines={2}>
                  {note.body || '—'}
                </Text>
                <Text style={styles.recentNoteDate}>
                  {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ''}
                </Text>
              </View>
            ))}
          </FadeIn>
        )}

        {notes.length === 0 && (
          <FadeIn delay={440}>
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🌱</Text>
              <Text style={styles.emptyTitle}>Your notebook is empty</Text>
              <Text style={styles.emptySub}>Tap "New" above to capture your first thought.</Text>
            </View>
          </FadeIn>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </Screen>
  );
}


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1, backgroundColor: COLORS.bg },
  container: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  greeting: { fontSize: 22, fontWeight: '700', color: COLORS.text, letterSpacing: 0.3 },
  date: { fontSize: 13, color: COLORS.muted, marginTop: 3 },
  newBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  newBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 26 },
  statPill: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
  },
  statIcon: { fontSize: 18, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, color: COLORS.muted, marginTop: 2 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: COLORS.muted, letterSpacing: 1.2, textTransform: 'uppercase' },
  sectionAction: { fontSize: 13, color: COLORS.accent },

  quoteCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
    marginBottom: 18,
  },
  quoteIcon: { fontSize: 40, color: COLORS.accent, lineHeight: 42, marginBottom: 4 },
  quoteText: { fontSize: 16, color: COLORS.text, lineHeight: 25, fontStyle: 'italic', fontWeight: '400' },
  quoteAuthor: { fontSize: 13, color: COLORS.muted, marginTop: 12, fontWeight: '600' },

  progressCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 14,
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  progressTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  progressLabel: { fontSize: 13, color: COLORS.muted },
  progressTrack: { height: 7, backgroundColor: '#2a2a30', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.accent, borderRadius: 4 },
  progressSub: { fontSize: 12, color: COLORS.muted, marginTop: 8 },

  streakCard: {
    backgroundColor: '#1c1710',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#3d2e10',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  streakEmoji: { fontSize: 28 },
  streakTitle: { fontSize: 14, fontWeight: '700', color: '#fde68a' },
  streakSub: { fontSize: 12, color: '#a38f60', marginTop: 3, lineHeight: 18 },
  streakBadge: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.green, justifyContent: 'center', alignItems: 'center',
  },
  streakBadgeText: { color: '#fff', fontWeight: '800', fontSize: 13 },

  tipCard: {
    backgroundColor: '#101820',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1a2d3a',
    padding: 16,
    marginBottom: 24,
  },
  tipText: { fontSize: 14, color: '#7dd3fc', lineHeight: 21 },

  recentNote: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 10,
  },
  recentNoteTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  recentNoteBody: { fontSize: 13, color: COLORS.muted, lineHeight: 19 },
  recentNoteDate: { fontSize: 11, color: '#4a4a5a', marginTop: 8 },

  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 44, marginBottom: 12 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  emptySub: { fontSize: 14, color: COLORS.muted, textAlign: 'center', lineHeight: 21 },
});
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import InputWithLabel from '../components/InputWithLabel';
import { useCreateNote } from '../queries/notesQuery';
import COLORS from '../utils/colors';

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const over = len > max;
  return (
    <Text style={[styles.charCount, over && { color: COLORS.danger }]}>
      {len}{max ? `/${max}` : ''}
    </Text>
  );
}

export default function AddNotes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { mutate: addNote, isPending } = useCreateNote();

  const btnScale = useRef(new Animated.Value(1)).current;
  const onPressIn = () =>
    Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true, speed: 30 }).start();
  const onPressOut = () =>
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true, speed: 30 }).start();

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const isReady = title.trim().length > 0 && content.trim().length > 0;

  const handleAddNote = () => {
    if (!title.trim()) {
      Alert.alert('Title required', 'Please enter a title for your note.');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Content required', 'Please write something in your note.');
      return;
    }
    addNote(
      { title, content },
      {
        onSuccess: () => {
          Alert.alert('Note saved ✦', 'Your note has been added successfully.', [
            { text: 'Done', onPress: () => router.back() },
          ]);
          setTitle('');
          setContent('');
        },
        onError: () => {
          Alert.alert('Something went wrong', 'Unable to save note. Please try again.');
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={scale(10)}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>New Note</Text>
              <Text style={styles.headerSub}>Capture your thought</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
              <MaterialIcons name="close" size={18} color={COLORS.muted} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputsWrap}>
            <InputWithLabel label="Title" value={title} onChangeText={setTitle} labelStyle={{color: COLORS.white, fontSize: scale(18)}}
/>
            <View style={styles.charRow}>
              <CharCount value={title} max={80} />
            </View>

            <InputWithLabel
              label="What's on your mind?"
              value={content}
              onChangeText={setContent}
              labelStyle={{color: COLORS.white, fontSize: scale(18)}}
              inputContainerStyle={{minHeight: scale(200)}}
            />
            <View style={styles.charRow}>
              <Text style={styles.wordCount}>{wordCount} word{wordCount !== 1 ? 's' : ''}</Text>
              <CharCount value={content} max={0} />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.tip}>✦ Your note is saved to your personal vault</Text>

            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
              <Pressable
                style={[styles.saveBtn, !isReady && styles.saveBtnDisabled]}
                onPress={handleAddNote}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                disabled={isPending}
              >
                {isPending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <View style={styles.saveBtnInner}>
                    <MaterialIcons name="check" size={18} color="#fff" />
                    <Text style={styles.saveBtnText}>Save Note</Text>
                  </View>
                )}
              </Pressable>
            </Animated.View>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(24),
    paddingTop: scale(6),
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
  closeBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  charRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(4),
    marginBottom: scale(12),
  },
  charCount: {
    fontSize: scale(11),
    color: COLORS.dim,
    marginTop: scale(-5)
  },
  wordCount: {
    fontSize: scale(11),
    color: COLORS.dim,
    marginTop: scale(-5)
  },

  footer: {
    marginTop: 'auto',
    paddingBottom: scale(20),
    gap: scale(12),
  },
  tip: {
    fontSize: scale(12),
    color: COLORS.dim,
    textAlign: 'center',
  },
  saveBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: scale(16),
    paddingVertical: scale(16),
    marginBottom: scale(-50),
    alignItems: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  saveBtnDisabled: {
    opacity: 0.45,
    shadowOpacity: 0,
    elevation: 0,
  },
  saveBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  saveBtnText: {
    fontSize: scale(16),
    fontWeight: '700',
    color: '#fff',
  },
  inputsWrap: { 
    marginTop: scale(-20)
   },
});
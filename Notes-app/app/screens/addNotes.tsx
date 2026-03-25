import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import InputWithLabel from '../components/InputWithLabel';
import Screen from '../components/Screen';
import { useCreateNote } from '../queries/notesQuery';
import COLORS from '../utils/colors';

export default function AddNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { mutate: addNote, isPending } = useCreateNote();

  const handleAddNote = () => {
    if (!title.trim()) {
      Alert.alert("Please enter the title of the note.");
      return;
    }
    if (!content.trim()) {
      Alert.alert("Please enter the content of the note.");
      return;
    }

    addNote({
      title, content
    }, {
      onSuccess: () => {
        Alert.alert("Success 🔥", "Note added successfully.\nYou can check the note in notes screen.", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      },

      onError: (error) => {
        console.log("Errror - ", error)
        Alert.alert("Unable to add note. Please try again later.");
      }
    })

    setContent("")
    setTitle("")

  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.addNotesText}>Add Notes</Text>
            <Pressable onPress={() => router.back()}>
              <MaterialIcons name="cancel" size={36} color="black" />
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <InputWithLabel
              value={title}
              onChangeText={setTitle}
              label="Enter title"
              labelStyle={styles.label}
              inputContainerStyle={styles.input}
            />

            <InputWithLabel
              value={content}
              onChangeText={setContent}
              label="Enter content"
              labelStyle={styles.label}
              inputContainerStyle={[styles.input, styles.textArea]}
            />
          </View>

          <View style={styles.footer}>
            <Pressable style={styles.saveButton} onPress={handleAddNote}>
              {
                isPending ? (
                  <ActivityIndicator size={'large'} color={'#A9A9A9'} />
                ) : (
                  <Text style={styles.addNote}>Add Note</Text>

                )
              }
            </Pressable>
          </View>

        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(15),
  },
  inputContainer: {
    marginTop: scale(10),
  },
  footer: {
    marginTop: 'auto',
  },
  label: {
    fontSize: scale(18),
    marginTop: scale(5),
  },
  input: {
    backgroundColor: COLORS.offWhite,
    elevation: 1,
  },
  textArea: {
    minHeight: scale(200),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addNotesText: {
    fontSize: scale(26),
    fontWeight: '700',
  },
  saveButton: {
    padding: scale(15),
    borderRadius: scale(10),
    borderColor: COLORS.gray,
    backgroundColor: COLORS.orange,
    borderWidth: 1,
  },
  addNote: {
    fontSize: scale(20),
    fontWeight: '600',
    color: COLORS.darkBlue,
    textAlign: 'center',
  },
});
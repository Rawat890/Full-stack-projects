import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import InputWithLabel from '../components/InputWithLabel';
import Screen from '../components/Screen';
import COLORS from '../utils/colors';

export default function AddNotes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.addNotesText}>Add Notes</Text>
          <Pressable onPress={() => { router.back() }}>
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
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(15),
  },
  inputContainer: {
    marginTop: scale(10),
  },
  label: {
    fontSize: scale(18),
  },
  input: {
    backgroundColor: COLORS.offWhite,
    height: scale(100),
    elevation: 1
  },
  textArea: {
    minHeight: scale(200),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addNotesText: {
    fontSize: scale(26),
    fontWeight: '700'
  }
});
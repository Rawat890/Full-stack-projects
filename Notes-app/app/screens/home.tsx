import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/appImages/write.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to Notes</Text>

      <Text style={styles.subtitle}>
        Capture your thoughts, ideas, and tasks in one place.
      </Text>

      <Pressable style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    backgroundColor: '#FFF8F0',
  },
  image: {
    width: scale(220),
    height: scale(220),
    marginBottom: scale(20),
  },
  title: {
    fontSize: scale(28),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scale(10),
  },
  subtitle: {
    fontSize: scale(16),
    color: '#666',
    textAlign: 'center',
    marginBottom: scale(30),
  },
  button: {
    backgroundColor: '#FF8C42',
    paddingVertical: scale(14),
    paddingHorizontal: scale(40),
    borderRadius: scale(12),
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: '600',
  },
});
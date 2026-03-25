import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonWithLabel from '../components/ButtonWithLabel';
import InputWithLabel from '../components/InputWithLabel';
import { AuthContext } from '../context/AuthContext';
import { navigate, replace } from '../utils/navigationService';
import { SCREENS } from '../utils/routes';
import { signupSchema } from '../utils/schemas/signupSchema';

import { scale } from 'react-native-size-matters';

const C = {
  bg: '#0d0d0f',
  surface: '#16161a',
  border: '#26262e',
  accent: '#a78bfa',
  accentSoft: '#a78bfa18',
  text: '#f0eefc',
  muted: '#6b6a7e',
};

export default function SignUp() {
  const { setToken } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', image: '' }
  });

  const image = watch('image');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://192.168.29.24:6000/register", data);
      const token = response.data.token;
      await AsyncStorage.setItem("authToken", token);
      setToken(token);
      Alert.alert("Registration successful !!");
      reset();
      replace("App", { screen: SCREENS.Chats });
    } catch (error) {
      Alert.alert("An error occurred while registering.");
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Tag ── */}
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>NEW ACCOUNT</Text>
            </View>
          </View>

          {/* ── Headline ── */}
          <Text style={styles.title}>Set up your{'\n'}profile</Text>
          <Text style={styles.subtitle}>
            Visible to your friends, connections and groups
          </Text>

          {/* ── Avatar ── */}
          <Pressable style={styles.avatarWrap}>
            <Image
              source={{
                uri: image
                  ? image
                  : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
              }}
              style={styles.profileImage}
            />
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarBadgeText}>+</Text>
            </View>
            <Text style={styles.addText}>Add photo</Text>
          </Pressable>

          {/* ── Form card ── */}
          <View style={styles.card}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputWithLabel
                  label="Email"
                  value={value}
                  placeholder="Enter email"
                  onChangeText={onChange}
                  secureTextEntry={false}
                  error={errors.email?.message}
                  labelStyle={styles.inputLabel}
                  inputContainerStyle={styles.inputContainer}
                />
              )}
            />

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <InputWithLabel
                  label="Name"
                  value={value}
                  placeholder="Enter name"
                  onChangeText={onChange}
                  secureTextEntry={false}
                  error={errors.name?.message}
                  labelStyle={styles.inputLabel}
                  inputContainerStyle={styles.inputContainer}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <InputWithLabel
                  label="Password"
                  value={value}
                  placeholder="Enter password"
                  onChangeText={onChange}
                  secureTextEntry={true}
                  error={errors.password?.message}
                  labelStyle={styles.inputLabel}
                  inputContainerStyle={styles.inputContainer}
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <InputWithLabel
                  label="Image URL (optional)"
                  value={value}
                  placeholder="Enter image url"
                  onChangeText={onChange}
                  secureTextEntry={false}
                  error={errors.image?.message}
                  labelStyle={styles.inputLabel}
                  inputContainerStyle={styles.inputContainer}
                />
              )}
            />
          </View>

          {/* ── CTA ── */}
          <View style={styles.buttonContainer}>
            <ButtonWithLabel
              title="Create my account  ✦"
              onPress={handleSubmit(onSubmit)}
              style={styles.submitBtn}
              textStyle={styles.submitBtnText}
            />
          </View>

          {/* ── Footer ── */}
          <View style={styles.alreadyHaveAccount}>
            <Text style={styles.alreadyHaveAccountText}>Already have an account?</Text>
            <Pressable onPress={() => navigate(SCREENS.Login)}>
              <Text style={styles.loginText}>Log in</Text>
            </Pressable>
          </View>

          <View style={{ height: scale(30) }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    paddingHorizontal: scale(22),
    paddingTop: scale(20),
  },

  // Tag
  tagRow: { marginBottom: scale(16) },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: C.accentSoft,
    borderRadius: scale(20),
    paddingHorizontal: scale(12),
    paddingVertical: scale(5),
    borderWidth: 1,
    borderColor: C.accent + '40',
  },
  tagText: {
    fontSize: scale(10),
    color: C.accent,
    fontWeight: '700',
    letterSpacing: 1.4,
  },

  // Headline
  title: {
    fontSize: scale(30),
    fontWeight: '800',
    color: C.text,
    lineHeight: scale(38),
    marginBottom: scale(8),
  },
  subtitle: {
    fontSize: scale(13),
    color: C.muted,
    lineHeight: scale(20),
    marginBottom: scale(28),
  },

  // Avatar
  avatarWrap: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: scale(28),
  },
  profileImage: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    borderWidth: 2,
    borderColor: C.accent,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: scale(18),
    right: -scale(2),
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    backgroundColor: C.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: C.bg,
  },
  avatarBadgeText: {
    color: '#fff',
    fontSize: scale(15),
    fontWeight: '700',
    lineHeight: scale(19),
  },
  addText: {
    textAlign: 'center',
    marginTop: scale(6),
    color: C.muted,
    fontSize: scale(11),
  },

  // Card wrapping inputs
  card: {
    backgroundColor: C.surface,
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
    paddingBottom: scale(6),
    marginBottom: scale(20),
  },

  // InputWithLabel style overrides (passed as props)
  inputLabel: {
    color: C.muted,
    fontSize: scale(12),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  inputContainer: {
    backgroundColor: '#111115',
    borderRadius: scale(12),
    borderWidth: 1.5,
    borderColor: C.border,
  },

  // Button
  buttonContainer: {
    marginBottom: scale(16),
  },
  submitBtn: {
    backgroundColor: C.accent,
    borderRadius: scale(16),
    paddingVertical: scale(16),
    borderWidth: 0,
    shadowColor: C.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: scale(15),
    letterSpacing: 0.3,
  },

  // Footer
  alreadyHaveAccount: {
    flexDirection: 'row',
    gap: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  alreadyHaveAccountText: {
    fontSize: scale(13),
    color: C.muted,
  },
  loginText: {
    fontSize: scale(13),
    color: C.accent,
    fontWeight: '700',
  },
});
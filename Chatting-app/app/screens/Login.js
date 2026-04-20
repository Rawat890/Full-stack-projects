import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import InputWithLabel from '../components/InputWithLabel';
import { AuthContext } from '../context/AuthContext';
import { replace } from '../utils/navigationService';
import { SCREENS } from '../utils/routes';
import { loginSchema } from '../utils/schemas/loginSchema';

export default function Login() {
  const { token, setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const titleSlide = useRef(new Animated.Value(-30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonShimmer = useRef(new Animated.Value(0)).current;
  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (token) replace('App', { screen: SCREENS.Chats });
  }, [token]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
      Animated.spring(titleSlide, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(orb1Anim, { toValue: 1, duration: 3500, useNativeDriver: true }),
        Animated.timing(orb1Anim, { toValue: 0, duration: 3500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(orb2Anim, { toValue: 1, duration: 4500, useNativeDriver: true }),
        Animated.timing(orb2Anim, { toValue: 0, duration: 4500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonShimmer, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(buttonShimmer, { toValue: 0, duration: 100, useNativeDriver: true }),
        Animated.delay(1500),
      ])
    ).start();
  }, []);

  const navigateToSignUp = () => replace(SCREENS.Register);

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, { toValue: 0.96, useNativeDriver: true, tension: 200, friction: 10 }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true, tension: 200, friction: 10 }).start();
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const user = { email: data.email, password: data.password };
    try {
      const response = await axios.post('http://192.168.29.24:6000/login', user);
      const token = response.data.token;
      await AsyncStorage.setItem('authToken', token);
      setToken(token);
      Alert.alert('User login successful');
    } catch (error) {
      Alert.alert('Error while login');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const orb1TranslateY = orb1Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
  const orb2TranslateY = orb2Anim.interpolate({ inputRange: [0, 1], outputRange: [0, 14] });
  const shimmerTranslate = buttonShimmer.interpolate({ inputRange: [0, 1], outputRange: [-120, 220] });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.orb1, { transform: [{ translateY: orb1TranslateY }] }]} />
      <Animated.View style={[styles.orb2, { transform: [{ translateY: orb2TranslateY }] }]} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.card,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Animated.View style={[styles.headerBlock, { transform: [{ translateY: titleSlide }] }]}>
              <View style={styles.iconRing}>
                <View style={styles.iconDot} />
              </View>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.subtitleText}>Sign in to continue</Text>
            </Animated.View>

            <View style={styles.divider} />

            <View style={styles.inputsBlock}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <InputWithLabel
                    label="Email"
                    value={value}
                    placeholder="Enter email"
                    onChangeText={onChange}
                    error={errors.email?.message}
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
                  />
                )}
              />

              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </View>

            {/* Animated Login Button */}
            <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
              <Pressable
                onPressIn={handleButtonPressIn}
                onPressOut={handleButtonPressOut}
                onPress={handleSubmit(onSubmit)}
                style={styles.loginButton}
              >
                {/* Shimmer sweep */}
                <Animated.View
                  style={[
                    styles.shimmer,
                    { transform: [{ translateX: shimmerTranslate }, { rotate: '20deg' }] },
                  ]}
                />
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Signing in…' : 'Login'}
                </Text>
              </Pressable>
            </Animated.View>

            <View style={styles.signUpRow}>
              <Text style={styles.doNotHaveAccountText}>Don't have an account?</Text>
              <Pressable onPress={navigateToSignUp}>
                <Text style={styles.signUpText}>Sign up</Text>
              </Pressable>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D0F14',
    overflow: 'hidden',
  },

  orb1: {
    position: 'absolute',
    top: -60,
    left: -80,
    width: scale(260),
    height: scale(260),
    borderRadius: scale(130),
    backgroundColor: '#2563EB',
    opacity: 0.18,
  },
  orb2: {
    position: 'absolute',
    bottom: -40,
    right: -60,
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
    backgroundColor: '#7C3AED',
    opacity: 0.15,
  },
  card: {
    marginHorizontal: scale(5),
    marginVertical: scale(30),
    borderRadius: scale(24),
    paddingHorizontal: scale(24),
    paddingVertical: scale(32),
    shadowColor: '',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  iconRing: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    borderWidth: 2,
    borderColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(14),
    backgroundColor: 'rgba(59,130,246,0.1)',
  },
  iconDot: {
    width: scale(14),
    height: scale(14),
    borderRadius: scale(7),
    backgroundColor: '#3B82F6',
  },
  welcomeText: {
    fontSize: scale(26),
    fontWeight: '700',
    color: '#F1F5F9',
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitleText: {
    fontSize: scale(13),
    color: '#64748B',
    marginTop: scale(4),
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginBottom: scale(20),
  },
  inputsBlock: {
    marginBottom: scale(8),
    marginHorizontal: scale(10)
  },
  forgotPassword: {
    color: '#3B82F6',
    fontSize: scale(12),
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginTop: scale(4),
    marginBottom: scale(4),
  },
  buttonWrapper: {
    marginTop: scale(24),
    borderRadius: scale(14),
    overflow: 'hidden',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 10,
    marginHorizontal: scale(10)
  },
  loginButton: {
    backgroundColor: '#2563EB',
    paddingVertical: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(14),
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: scale(60),
    height: '200%',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: scale(4),
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: scale(15),
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(4),
    marginTop: scale(20),
  },
  doNotHaveAccountText: {
    fontSize: scale(12),
    color: '#64748B',
  },
  signUpText: {
    fontSize: scale(12),
    color: '#3B82F6',
    fontWeight: '600',
  },
});
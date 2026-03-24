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
import { COLORS } from '../utils/colors';


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
    defaultValues: {
      name: '',
      email: '',
      password: '',
      image: ''
    }
  });

  const image = watch('image');

  const navigateToSignUp = () => {
    navigate(SCREENS.Login);
  };

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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <Text style={styles.loginToAccountText}>Set up your profile</Text>

            <Text style={styles.profileAreVisible}>
              Profiles are visible to your friends and connections and groups
            </Text>

            <Pressable style={{ marginTop: 20 }}>
              <Image
                source={{
                  uri: image
                    ? image
                    : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
                }}
                style={styles.profileImage}
              />
              <Text style={styles.addText}>Add</Text>
            </Pressable>

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

            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <InputWithLabel
                  label="Image"
                  value={value}
                  placeholder="Enter image url"
                  onChangeText={onChange}
                  secureTextEntry={false}
                  error={errors.image?.message}
                />
              )}
            />

            <View style={styles.forgotPasswordView}>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </View>

            <View style={styles.buttonContainer}>
              <ButtonWithLabel
                title="Create my account"
                onPress={handleSubmit(onSubmit)}
              />

              <View style={styles.alreadyHaveAccount}>
                <Text style={styles.alreadyHaveAccountText}>
                  Already have an account.
                </Text>

                <Pressable onPress={navigateToSignUp}>
                  <Text style={styles.loginText}>Login</Text>
                </Pressable>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(30),
    marginTop: scale(30)
  },
  loginToAccountText: {
    fontSize: scale(22),
    marginVertical: scale(10)
  },
  profileAreVisible: {
    fontSize: scale(14),
    textAlign: 'center',
    color: COLORS.darkGrey,
    marginBottom: scale(12),
    marginTop: scale(-8)
  },
  buttonContainer: {
    marginHorizontal: scale(40),
    marginTop: scale(40)
  },
  forgotPassword: {
    color: COLORS.blue,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: scale(-10)
  },
  forgotPasswordView: {
    marginLeft: scale(180),
  },
  alreadyHaveAccount: {
    flexDirection: 'row',
    gap: scale(3),
    justifyContent: 'center',
    marginVertical: scale(2)
  },
  alreadyHaveAccountText: {
    fontSize: scale(12),
  },
  loginText: {
    fontSize: scale(12),
    color: COLORS.grey
  },
  addText: {
    textAlign: 'center',
    marginTop: scale(4),
    color: COLORS.darkGrey,
    fontSize: scale(12),
  },
  profileImage: { width: scale(50), height: scale(50), borderRadius: scale(25) }
})
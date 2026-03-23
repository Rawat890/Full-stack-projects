import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import ButtonWithLabel from '../components/ButtonWithLabel';
import InputWithLabel from '../components/InputWithLabel';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../utils/colors';
import { replace } from '../utils/navigationService';
import { SCREENS } from '../utils/routes';
import { loginSchema } from '../utils/schemas/loginSchema';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(AuthContext);

  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues :{
      email: '',
      password: ''
    }
  })
  useEffect(() => {
    if (token) {
      replace("App", { screen: SCREENS.Chats })
    }
  }, [token])

  const navigateToSignUp = () => {
    replace(SCREENS.Register);
  };

  const onSubmit = async () => {
    const user = {
      email: email,
      password: password
    }
    axios.post("http://10.12.178.201:6000/login", user).then(async (response) => {
      console.log("Backend response - ", response);
      const token = response.data.token;
      await AsyncStorage.setItem("authToken", token)
      setToken(token);
      Alert.alert("User login successful")
    }).catch((error) => {
      Alert.alert("Error while login")
      console.log(error)
    })
  }

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
          <Text style={styles.loginToAccountText}>
            Login to Your Account
          </Text>

          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <InputWithLabel
                label="Email"
                value={email}
                placeholder="Enter email"
                onChangeText={setEmail}
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


          <Text style={styles.forgotPassword}>Forgot Password</Text>

          <View style={styles.buttonContainer}>
            <ButtonWithLabel title="Login" onPress={handleSubmit(onSubmit)} />

            <View style={styles.doNotHaveAccount}>
              <Text style={styles.doNotHaveAccountText}>
                Don't have an account ?
              </Text>

              <Pressable onPress={navigateToSignUp}>
                <Text style={styles.signUpText}>Sign up</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
)
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: scale(120)
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(30),
    marginTop: scale(50)
  },
  loginToAccountText: {
    fontSize: scale(22),
    marginVertical: scale(20)
  },
  buttonContainer: {
    marginHorizontal: scale(40),
    marginTop: scale(40)
  },
  forgotPassword: {
    color: COLORS.blue,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginLeft: scale(200),
    marginTop: scale(-10)
  },
  doNotHaveAccount: {
    flexDirection: 'row',
    gap: scale(3),
    justifyContent: 'center',
    marginVertical: scale(2)
  },
  doNotHaveAccountText: {
    fontSize: scale(12),
  },
  signUpText: {
    fontSize: scale(12),
    color: COLORS.grey
  }
})
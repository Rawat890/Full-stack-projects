import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import ButtonWithLabel from '../components/ButtonWithLabel';
import InputWithLabel from '../components/InputWithLabel';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../utils/colors';
import { navigate, replace } from '../utils/navigationService';
import { SCREENS } from '../utils/routes';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const { token, setToken } = useContext(AuthContext);

  const navigateToSignUp = () => {
    navigate(SCREENS.Login)
  }

  const handleRegisteration = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image
    }
    axios.post("http://10.206.64.208:6000/register", user).then((response) => {
      console.log(response)
      Alert.alert("Registration successful !!")
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token)
      setToken(token);
      setName('')
      setEmail('')
      setPassword('')
      setImage('')
      replace("App", { screen: SCREENS.Chats })
    }).catch((error) => {
      Alert.alert("An error occurred while registering.")
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

            <InputWithLabel
              label="Email"
              value={email}
              placeholder="Enter email"
              onChangeText={setEmail}
            />

            <InputWithLabel
              label="Name"
              value={name}
              placeholder="Enter name"
              onChangeText={setName}
            />

            <InputWithLabel
              label="Password"
              value={password}
              placeholder="Enter password"
              onChangeText={setPassword}
              secureTextEntry
            />

            <InputWithLabel
              label="Image"
              value={image}
              placeholder="Enter image url"
              onChangeText={setImage}
            />

            <View style={styles.forgotPasswordView}>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </View>

            <View style={styles.buttonContainer}>
              <ButtonWithLabel
                title="Create my account"
                onPress={handleRegisteration}
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
import AnimatedButton from "@/src/components/AnimatedButton";
import AnimatedInput from "@/src/components/AnimatedInput";
import { useAuth } from "@/src/context/AuthContext";
import { COLORS } from "@/src/utils/colors";
import { fonts } from "@/src/utils/fonts";
import { loginImage } from "@/src/utils/images";
import { navigate } from "@/src/utils/navigationService";
import { SCREENS } from "@/src/utils/routes";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPasword] = useState<string>("");
    const { login } = useAuth();
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Please enter email and password")
        }
        try {
            await login(email, password);
            Alert.alert("User signed in successfully")

        } catch (error) {
            Alert.alert("Error while signing in.")
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: scale(50) }}>
                <Text style={styles.headerText}>Welcome to rapido</Text>

                <Text style={styles.descriptionText}>Covenient rides, Anytime, Anywhere</Text>
                <Image
                    source={loginImage}
                    style={styles.image}
                />
            </View>
            <View style={styles.inputView}>
                <AnimatedInput
                    label="Email"
                    placeholder="Enter your email"
                    inputContainerStyle={styles.inputContainer}
                    value={email}
                    onChangeText={setEmail}
                    labelStyle={styles.label}
                    textStyle={styles.inputText}
                />
                <AnimatedInput
                    label="Password"
                    placeholder="Enter your password"
                    inputContainerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                    textStyle={styles.inputText}
                    value={password}
                    onChangeText={setPasword}
                />
                <Pressable style={{ alignSelf: 'flex-end', marginRight: scale(24), marginTop: scale(-15) }} onPress={() => navigate(SCREENS.ForgotPassword)}>
                    <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                </Pressable>
            </View>
            <AnimatedButton
                title="Login to rapido"
                inputContainerStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={handleLogin}
            />

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: scale(5) }}>
                <Text style={styles.noAccountText}>
                    Don't have an account?
                </Text>
                <Pressable onPress={() => navigate(SCREENS.Register)}>
                    <Text style={styles.signUpText}> Sign Up</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.yellow,
        flex: 1,
    },
    descriptionText: {
        fontFamily: fonts.notoSemi,
        fontSize: scale(16),
        backgroundColor: COLORS.yellow,
        color: COLORS.darkGrey
    },
    headerText: {
        fontFamily: fonts.notoSemi,
        fontSize: scale(20),
        backgroundColor: COLORS.yellow,
        color: COLORS.darkGrey
    },
    inputContainer: {
        borderWidth: 2,
        padding: scale(5),
        marginHorizontal: scale(20)
    },
    button: {
        padding: scale(10),
        marginHorizontal: scale(20),
        borderRadius: scale(10),
        marginTop: scale(18),
        backgroundColor: COLORS.primary
    },
    buttonText: {
        fontFamily: fonts.notoBold,
        fontSize: scale(16),
        textAlign: "center",
        color: COLORS.white
    },
    inputText: {
        fontFamily: fonts.notoSemi,
        fontSize: scale(12),
        backgroundColor: COLORS.yellow
    },
    label: {
        fontFamily: fonts.notoSemi,
        fontSize: scale(14),
        backgroundColor: COLORS.yellow,
        color: COLORS.darkGrey
    },
    image: {
        width: scale(240),
        height: scale(240),
    },
    inputView: {
        marginTop: scale(40),
        alignItems: 'center'
    },
    noAccountText: {
        fontFamily: fonts.notoSemi,
        fontSize: scale(14),
    },
    signUpText: {
        fontFamily: fonts.notoSemi,
        fontSize: scale(14),
        color: COLORS.primary,
    },
    forgotPasswordText: {
        fontFamily: fonts.notoSemi,
        fontSize: scale(12),
        color: COLORS.primary,
        textAlign: 'right',
        textDecorationLine: 'underline'
    }
})


export default Login;
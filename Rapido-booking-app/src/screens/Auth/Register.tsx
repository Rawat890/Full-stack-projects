import AnimatedButton from "@/src/components/AnimatedButton";
import AnimatedInput from "@/src/components/AnimatedInput";
import { useAuth } from "@/src/context/AuthContext";
import { COLORS } from "@/src/utils/colors";
import { fonts } from "@/src/utils/fonts";
import { registerImage } from "@/src/utils/images";
import { navigate } from "@/src/utils/navigationService";
import { SCREENS } from "@/src/utils/routes";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

const Register = () => {
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { register } = useAuth();

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Please enter email and password")
            return;
        }
        try {
            await register(email, password, phone);
            Alert.alert("User sign up successfull")

        } catch (error) {
            Alert.alert("Error while sining up.")
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: scale(50) }}>
                <Text style={styles.headerText}>Welcome to rapido</Text>

                <Text style={styles.descriptionText}>Easy rides, anytime, anywhere</Text>
                <Image
                    source={registerImage}
                    style={styles.image}
                />
            </View>
            <View style={styles.inputView}>
                <AnimatedInput
                    label="Email"
                    placeholder="Enter your email"
                    inputContainerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                    textStyle={styles.inputText}
                    value={email}
                    onChangeText={setEmail}
                />
                <AnimatedInput
                    label="Password"
                    placeholder="Enter your password"
                    inputContainerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                    textStyle={styles.inputText}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <AnimatedInput
                label="Mobile Number"
                placeholder="Enter mobile number"
                inputContainerStyle={styles.inputContainer}
                value={phone}
                onChangeText={setPhone}
                labelStyle={styles.label}
                textStyle={styles.inputText}
            />
            <AnimatedButton
                title="Sign up to rapido"
                inputContainerStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={handleRegister}
            />

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: scale(5) }}>
                <Text style={styles.noAccountText}>
                    Already have an account.
                </Text>
                <Pressable onPress={() => navigate(SCREENS.login)}>
                    <Text style={styles.signUpText}> Sign in</Text>
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
        marginHorizontal: scale(30)
    },
    button: {
        padding: scale(10),
        marginHorizontal: scale(40),
        borderRadius: scale(10),
        backgroundColor: COLORS.primary
    },
    buttonText: {
        fontFamily: fonts.notoSemi,
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
        width: scale(220),
        height: scale(220),
    },
    inputView: {
        marginTop: scale(5),
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
    }
})


export default Register;
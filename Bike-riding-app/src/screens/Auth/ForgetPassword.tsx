import AnimatedButton from "@/src/components/AnimatedButton";
import AnimatedInput from "@/src/components/AnimatedInput";
import { COLORS } from "@/src/utils/colors";
import { fonts } from "@/src/utils/fonts";
import { loginImage } from "@/src/utils/images";
import { navigate } from "@/src/utils/navigationService";
import { SCREENS } from "@/src/utils/routes";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const handleLogin = () => {

    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: scale(70) }}>

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
            </View>

            <AnimatedButton
                title="Reset password"
                inputContainerStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={()=>{}}
            />

            <AnimatedButton
                title="Back to login"
                inputContainerStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={()=>navigate(SCREENS.login)}
            />
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
        padding: scale(10),
        marginHorizontal: scale(20)
    },
    button: {
        padding: scale(10),
        borderRadius: scale(10),
        marginTop: scale(8),
        backgroundColor: COLORS.primary,
        marginHorizontal: scale(30)
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
    },
})


export default ForgetPassword;
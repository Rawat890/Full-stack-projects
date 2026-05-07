import AnimatedButton from "@/src/components/AnimatedButton";
import AnimatedInput from "@/src/components/AnimatedInput";
import { COLORS } from "@/src/utils/colors";
import { fonts } from "@/src/utils/fonts";
import { registerImage } from "@/src/utils/images";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

const Register = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPasword] = useState<string>("");
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: scale(30) }}>
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
                    value={name}
                    onChangeText={setName}
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
                <AnimatedInput
                    label="Password"
                    placeholder="Enter your password"
                    inputContainerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                    textStyle={styles.inputText}
                    value={password}
                    onChangeText={setPasword}
                />
            </View>
            <AnimatedButton
                title="Sign in to rapido"
                inputContainerStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() => { }}
            />

            <View style={{ alignItems: 'center', marginTop: scale(10) }}>
                <Text style={styles.noAccountText}>
                    Already have an account.
                    <Pressable>
                        <Text style={styles.signUpText}>Sign in</Text>
                    </Pressable>
                </Text>
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
        padding: scale(10),
        marginHorizontal: scale(20)
    },
    button: {
        padding: scale(10),
        marginHorizontal: scale(40),
        borderRadius: scale(10),
        backgroundColor: COLORS.primary
    },
    buttonText: {
        fontFamily: fonts.notoSemi,
        fontSize: scale(20),
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
        fontSize: scale(16),
    },
    signUpText: {
        fontFamily: fonts.notoSemi,
        fontSize: scale(16),
        color: COLORS.primary,
    }
})


export default Register;
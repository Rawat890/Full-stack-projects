import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgetPassword from "../screens/Auth/ForgetPassword";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import { SCREENS } from "../utils/routes";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

    const isAuthenticated = true;

    return (
        <Stack.Navigator
        screenOptions={{headerShown: false}}>
            <Stack.Screen name={SCREENS.login} component={Login} />
            <Stack.Screen name={SCREENS.Register} component={Register} />
            <Stack.Screen name={SCREENS.ForgotPassword} component={ForgetPassword} />
        </Stack.Navigator>
    )
}

export default AuthNavigator
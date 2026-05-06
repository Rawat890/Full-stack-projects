import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import { SCREENS } from "../utils/routes";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

    const isAuthenticated = true;

    return (
        <Stack.Navigator>
            <Stack.Screen name={SCREENS.login} component={Login} />
            <Stack.Screen name={SCREENS.Register} component={Register} />
        </Stack.Navigator>
    )
}

export default AuthNavigator
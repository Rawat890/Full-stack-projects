import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { navigationRef } from "../utils/navigationService";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";


const RootNavigator = () => {
    const {isAuthenticated} = useAuth();
    console.log(isAuthenticated)

    return (
        <NavigationContainer ref={navigationRef}>
            {
                isAuthenticated ? <AppNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>
    )
}

export default RootNavigator;
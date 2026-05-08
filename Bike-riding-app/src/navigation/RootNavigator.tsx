import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../utils/navigationService";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";


const RootNavigator = () => {

    const isAuthenticated = false;

    return (
        <NavigationContainer ref={navigationRef}>
            {
                isAuthenticated ? <AppNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>
    )
}

export default RootNavigator;
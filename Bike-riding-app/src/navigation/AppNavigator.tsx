
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/App/Home';
import Search from '../screens/App/Search';
import SelectRide from '../screens/App/SelectRide';
import { SCREENS } from '../utils/routes';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={SCREENS.Home} component={Home} />
            <Stack.Screen name={SCREENS.SelectRide} component={SelectRide} />
            <Stack.Screen name={SCREENS.SelectRide} component={Search} />
        </Stack.Navigator>
    )
}

export default AppNavigator;
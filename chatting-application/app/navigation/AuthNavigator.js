import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { SCREENS } from '../utils/routes';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={SCREENS.Login}
          component={Login}
        />
        <Stack.Screen
          name={SCREENS.Register}
          component={Signup}
        />
      </Stack.Navigator>
  )
}
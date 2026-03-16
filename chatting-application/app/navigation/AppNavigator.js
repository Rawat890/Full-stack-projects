import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from '../screens/Chat';
import Chats from '../screens/Chats';
import Peoples from '../screens/Peoples';
import Profile from '../screens/Profile';
import RequestChatRoom from '../screens/RequestChatRoom';
import { COLORS } from '../utils/colors';
import { SCREENS } from '../utils/routes';

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name={SCREENS.Chats}
          component={Chats}
          options={{
            tabBarStyle: { backgroundColor: COLORS.black },
            headerShown: false,
            tabBarIcon: ({ focused }) => focused ?
              (
                <Ionicons name="chatbox-ellipses-sharp" size={30} color={COLORS.white} />
              ) : (
                <Ionicons name="chatbox-ellipses-sharp" size={30} color={COLORS.grey} />
              )
          }}
        />
        <Tab.Screen
          name={SCREENS.Profile}
          component={Profile}
          options={{
            tabBarStyle: { backgroundColor: COLORS.black },
            headerShown: false,
            tabBarIcon: ({ focused }) => focused ?
              (<FontAwesome6 name="user-tie" size={24} color={COLORS.white} />) :
              (<FontAwesome6 name="user-tie" size={24} color={COLORS.grey} />)
          }}
        />
      </Tab.Navigator>
    )
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='BottomTabs'
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.Chat}
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.Peoples}
        component={Peoples}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.RequestChatRoom}
        component={RequestChatRoom}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  )
}
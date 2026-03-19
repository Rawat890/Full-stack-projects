import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EatWell from '../screens/Application/EatWell';
import GetBurn from '../screens/Application/GetBurn';
import ImproveSleepQuality from '../screens/Application/ImproveSleepQuality';
import TrackYourGoal from '../screens/Application/TrackYourGoal';
import WelcomeScreen from '../screens/Application/WelcomeScreen';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import navigationRoutes from '../utilities/constants/navigationRoutes';

export type AuthStackParamList = {
  [navigationRoutes.WELCOME]: undefined;
  [navigationRoutes.TRACK_YOUR_GOAL]: undefined;
  [navigationRoutes.GET_BURN]: undefined;
  [navigationRoutes.EAT_WELL]: undefined;
  [navigationRoutes.IMPROVE_SLEEP_QUALITY]: undefined;
  [navigationRoutes.SIGN_UP]: undefined;
  [navigationRoutes.LOGIN]: undefined;
  [navigationRoutes.FORGET_PASSWORD]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={navigationRoutes.WELCOME}>
      <Stack.Screen name={navigationRoutes.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={navigationRoutes.TRACK_YOUR_GOAL} component={TrackYourGoal} />
      <Stack.Screen name={navigationRoutes.GET_BURN} component={GetBurn} />
      <Stack.Screen name={navigationRoutes.EAT_WELL} component={EatWell} />
      <Stack.Screen name={navigationRoutes.IMPROVE_SLEEP_QUALITY} component={ImproveSleepQuality} />
      <Stack.Screen name={navigationRoutes.SIGN_UP} component={SignUp} />
      <Stack.Screen name={navigationRoutes.LOGIN} component={Login} />
      <Stack.Screen name={navigationRoutes.FORGET_PASSWORD} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

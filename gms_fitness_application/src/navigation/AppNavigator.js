import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import navigationRoutes from '../utilities/constants/navigationRoutes';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = ({ initialRouteName, initialParams }) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>

      <Stack.Screen name={navigationRoutes.AUTH} component={AuthNavigator} />

      <Stack.Screen
        name={navigationRoutes.MAIN_NAVIGATOR}
        component={MainNavigator}
        initialParams={initialRouteName === navigationRoutes.MAIN_NAVIGATOR ? initialParams : undefined}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;

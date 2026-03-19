import NetInfo from '@react-native-community/netinfo';
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import NoInternetBanner from 'components/NoInternetBanner';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StatusBar } from 'react-native';
import Config from 'react-native-config';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { Notification } from './components/Notification';
import { getDataOfUser } from './firebase/UserData';
import AppNavigator from './navigation/AppNavigator';
import { startSession } from './screens/Application/ProfileTab/sessionSlice';
import { setUserData } from './screens/Application/ProfileTab/userSlice';
import { loginSuccess } from './screens/Auth/authSlice';
import navigationRoutes from './utilities/constants/navigationRoutes';
import { getExpirationToken } from './utilities/helper/calculation';
import { convertTimestamp } from './utilities/helper/dateFunctions';
import './localization/index';
import { navigationRef } from './utilities/navigationService';

SplashScreen.preventAutoHideAsync().catch(() => { });

const App = () => {
  const { t } = useTranslation();
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkForUpdate() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: t('updateCheckFailed'),
          text2: t('pleaseTryAgainLater'),
        });
      }
    }

    checkForUpdate();
  }, [t]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Toast.show({
          type: 'error',
          text1: t('noInternetConnection'),
          text2: t('pleaseCheckNetwork'),
        });
      }
    });

    return () => unsubscribe();
  }, [t]);

  useEffect(() => {
    const prepareApp = async () => {
      if (isConnected === false) {
        setAppIsReady(true);
        return;
      }

      if (isConnected === null) {
        return;
      }

      try {
        GoogleSignin.configure({
          webClientId: Config.WEB_CLIENT_ID,
          offlineAccess: true,
        });

        const authInstance = getAuth(getApp());
        const user = authInstance.currentUser;
        let determinedInitialRoute;

        if (!user) {
          determinedInitialRoute = { name: navigationRoutes.AUTH };
          Toast.show({
            type: 'info',
            text1: t('authRequired'),
            text2: t('pleaseSignIn'),
          });
        } else {
          dispatch(startSession());

          const [token, firestoreUserData] = await Promise.all([
            user.getIdToken(),
            getDataOfUser(user.uid),
          ]);

          let finalUserData;
          let initialScreenName;
          let toastType = 'success';
          let toastText1 = t('welcomeBack');
          let toastText2 = `${user.displayName || t('fitnessUser')}, ${t('happyToSeeYou')}`;

          if (!firestoreUserData) {
            finalUserData = {
              uid: user.uid,
              email: user.email,
              fullName: user.displayName || '',
              isProfileComplete: false,
            };
            initialScreenName = navigationRoutes.PROFILE_SETUP;
            toastType = 'info';
            toastText1 = t('profile_setup_needed');
            toastText2 = t('pleaseCompleteProfile_now');
          } else if (!firestoreUserData.isProfileComplete) {
            finalUserData = firestoreUserData;
            initialScreenName = navigationRoutes.PROFILE_SETUP;
            toastType = 'info';
            toastText1 = t('profileIncomplete');
            toastText2 = t('pleaseCompleteProfile');
          } else {
            finalUserData = firestoreUserData;
            initialScreenName = navigationRoutes.BOTTOM_TAB_NAVIGATOR;
          }

          dispatch(
            loginSuccess({
              token,
              expirationToken: getExpirationToken(),
            }),
          );

          const serializedUserData = {
            ...(finalUserData || {}),
            uid: user.uid,
            email: user.email,
            isProfileComplete: finalUserData?.isProfileComplete || false,
            createdAt: finalUserData?.createdAt ? convertTimestamp(finalUserData.createdAt) : undefined,
            updatedAt: finalUserData?.updatedAt ? convertTimestamp(finalUserData.updatedAt) : undefined,
            ...(finalUserData?.dob && { dob: convertTimestamp(finalUserData.dob) }),
          };
          dispatch(setUserData(serializedUserData));

          determinedInitialRoute = {
            name: navigationRoutes.MAIN_NAVIGATOR,
            params: { screen: initialScreenName },
          };

          Toast.show({
            type: toastType,
            text1: toastText1,
            text2: toastText2,
          });
        }

        setInitialRoute(determinedInitialRoute);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: t('authFailed'),
          text2: t('unableToVerifyAccount'),
        });
        setInitialRoute({ name: navigationRoutes.AUTH });
      } finally {
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, [dispatch, t, isConnected]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (isConnected === null || !appIsReady) {
    return null;
  }

  if (!isConnected) {
    return (
      <NoInternetBanner />
    );
  }

  if (!initialRoute) {
    return null;
  }

return (
  <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <NavigationContainer ref={navigationRef} onReady={onLayoutRootView}>
        <StatusBar
      barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      backgroundColor={Platform.OS === 'android' ? '#000' : undefined}
    />
        <AppNavigator
          initialRouteName={initialRoute.name}
          initialParams={initialRoute.params}
        />
        <Toast config={Notification} />
      </NavigationContainer>
    </SafeAreaView>
  </SafeAreaProvider>
);
};

export default App;

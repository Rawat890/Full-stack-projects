import { getAuth, signOut } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Alert, Animated } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import LoadingModal from '../../../../../components/LoadingModal';
import { Other } from '../../../../../components/TextComponents';
import { logout } from '../../../../../screens/Auth/authSlice';
import navigationRoutes from '../../../../../utilities/constants/navigationRoutes';
import { replace } from '../../../../../utilities/navigationService';
import { endSession } from '../../../ProfileTab/sessionSlice';
import { clearUserData } from '../../../ProfileTab/userSlice';

import { styles } from './styles';

interface LogoutButtonProps {}
const LogoutButton:React.FC<LogoutButtonProps> = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { t } = useTranslation();
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const confirmLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(getAuth());
      const hasSignedInBefore = await GoogleSignin.hasPreviousSignIn();
      if (hasSignedInBefore) {
        await GoogleSignin.signOut();
      }
      dispatch(logout());
      dispatch(clearUserData());
      dispatch(endSession());
      Toast.show({
        type: 'success',
        text1: t('logoutSuccess'),
      });

      replace(navigationRoutes.AUTH);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('logoutFailed'),
        text2: t('unableToLogout'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setTimeout(() => {
      Alert.alert(
        t('logout'),
        t('sureLogout'),
        [
          { text: t('cancel'), style: 'cancel' },
          { text: t('logout'), onPress: confirmLogout },
        ],
        { cancelable: true },
      );
    }, 0);
  };

  return (
    <>
      <Pressable
        onPress={handleLogout}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
          <Other style={styles.text}>{t('logout')}</Other>
        </Animated.View>
      </Pressable>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default LogoutButton;

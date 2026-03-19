import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { getDataOfUser, storeCompleteUserProfile } from '../../firebase/UserData';
import { setUserData, updateUserProfile } from '../../screens/Application/ProfileTab/userSlice';
import { loginSuccess } from '../../screens/Auth/authSlice';
import { facebook, google, login } from '../../utilities/constants/images';
import navigationRoutes from '../../utilities/constants/navigationRoutes';
import { getExpirationToken } from '../../utilities/helper/calculation';
import { navigate, replace } from '../../utilities/navigationService';
import IconUniversalButton from '../IconUniversalButton';
import { Body3, Other } from '../TextComponents';
import TextUniversalButton from '../TextUniversalButton';

import { styles } from './styles';

type SocialLoginProps = {
  buttonLabel: string;
  label: string;
  onPress: () => void;
  screen: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  footerText: string;
};

const SocialLogin: React.FC<SocialLoginProps> = ({
  buttonLabel,
  label,
  onPress,
  screen,
  isLoading,
  setIsLoading,
  footerText,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isLoginScreen = screen === 'Login';

  const handleGoogleSign = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { data } = await GoogleSignin.signIn();
      const idToken = data?.idToken;

      if (!idToken) {
        Toast.show({
          type: 'error',
          text1: t('googleError'),
          text2: t('noIdToken'),
        });
        return;
      }

      const credential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(credential);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const userData = await getDataOfUser(user.uid);

      if (!userData) {
        const newUserData = {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName || '',
          phone: user.phoneNumber || '',
          isProfileComplete: false,
        };

        await storeCompleteUserProfile(newUserData);

        Toast.show({
          type: 'success',
          text1: t('googleSignupSuccess'),
          text2: t('letsCompleteProfile'),
        });

        dispatch(loginSuccess({
          token,
          expirationToken: getExpirationToken(),
        }));
        dispatch(setUserData(newUserData));

        replace(navigationRoutes.MAIN_NAVIGATOR, { screen: navigationRoutes.PROFILE_SETUP });
      } else {
        dispatch(loginSuccess({
          token,
          expirationToken: getExpirationToken(),
        }));
        dispatch(updateUserProfile({
          ...userData,
          isProfileComplete: userData?.isProfileComplete ?? true,
        }));

        Toast.show({
          type: 'success',
          text1: t('googleLoginSuccess'),
          text2: t('welcomeToGmsApp'),
          visibilityTime: 4000,
        });

        replace(navigationRoutes.MAIN_NAVIGATOR, { screen: navigationRoutes.BOTTOM_TAB_NAVIGATOR });
      }
    } catch (error: any) {
      let errorMessage = t(isLoginScreen ? 'unableRequest' : 'pleaseTryAgain');
      let errorTitle = t(isLoginScreen ? 'googleError' : 'error');

      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          errorTitle = t('accountExists');
          errorMessage = t('accountExistsMessage');
          break;
        case 'auth/invalid-credential':
          errorTitle = t('invalidCredential');
          errorMessage = t('invalidCredentialMessage');
          break;
        case 'auth/operation-not-allowed':
          errorTitle = t('operationNotAllowed');
          errorMessage = t('operationNotAllowedMessage');
          break;
        case 'auth/user-disabled':
          errorTitle = t('userDisabled');
          errorMessage = t('userDisabledMessage');
          break;
        case 'auth/user-not-found':
          errorTitle = t('userNotFound');
          errorMessage = t('userNotFoundMessage');
          break;
        case 'auth/wrong-password':
          errorTitle = t('wrongPassword');
          errorMessage = t('wrongPasswordMessage');
          break;
        case 'auth/network-request-failed':
          errorTitle = t('networkError');
          errorMessage = t('networkErrorMessage');
          break;
        case 'auth/too-many-requests':
          errorTitle = t('tooManyRequests');
          errorMessage = t('tooManyRequestsMessage');
          break;
        case 'auth/popup-closed-by-user':
          errorTitle = t('popupClosed');
          errorMessage = t('popupClosedMessage');
          break;
        case 'auth/cancelled':
          errorTitle = t('cancelled');
          errorMessage = t('cancelledMessage');
          break;
        case 'auth/internal-error':
          errorTitle = t('internalError');
          errorMessage = t('internalErrorMessage');
          break;
        default:
          break;
      }

      Toast.show({
        type: 'error',
        text1: errorTitle,
        text2: errorMessage,
        visibilityTime: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFooterNavigation = (): void => {
    const targetScreen = isLoginScreen ? navigationRoutes.SIGN_UP : navigationRoutes.LOGIN;
    navigate(targetScreen);
  };

  return (
    <View style={styles.loginSectionContainer}>
      {isLoginScreen ? (
        <IconUniversalButton source={login} label={buttonLabel} onPress={onPress} />
      ) : (
        <TextUniversalButton label={buttonLabel} onPress={onPress} />
      )}

      <View style={styles.loginIconContainer}>
        <View style={[styles.orContainer, { marginVertical: isLoginScreen ? scale(20) : scale(-10) }]}>
          <View style={styles.line} />
          <Body3 style={styles.orText}>{t('or')}</Body3>
          <View style={styles.line} />
        </View>

        <View style={styles.socialIcons}>
          <IconUniversalButton source={google} onPress={handleGoogleSign} />
          <IconUniversalButton source={facebook} />
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Body3 style={styles.footText}>{footerText}</Body3>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={handleFooterNavigation}
        >
          <Other style={styles.loginText}>{label}</Other>
        </Pressable>
      </View>
    </View>
  );
};

export default SocialLogin;

import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  View,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import InputWithIcons from '../../../components/InputWithIcons';
import LoadingModal from '../../../components/LoadingModal';
import SocialLogin from '../../../components/SocialLogin';
import { Body1, Body2, Heading1, Heading2, SubHeading } from '../../../components/TextComponents';
import { getDataOfUser } from '../../../firebase/UserData';
import { loginSuccess } from '../../../screens/Auth/authSlice';
import { emailIcon, eye, hide, passwordIcon } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { INPUT_FIELDS } from '../../../utilities/constants/others';
import { getExpirationToken } from '../../../utilities/helper/calculation';
import { navigate, replace } from '../../../utilities/navigationService';
import { setUserData } from '../../Application/ProfileTab/userSlice';

import { styles } from './styles';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEyeClicked, setIsEyeClicked] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    clearErrors,
  } = useForm<FormData>({});

  const { t } = useTranslation();
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const navigateToForgotPassword = () => {
    navigate(navigationRoutes.FORGET_PASSWORD);
  };

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    setIsLoading(true);
    try {
      const app = getApp();
      const authInstance = getAuth(app);
      const userCredential = await authInstance.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      const expirationToken = getExpirationToken();

      const userData = await getDataOfUser(user.uid);

      const serializedUserData = userData
        ? {
            ...userData,
            uid: user.uid,
            email: user.email,
            createdAt: userData.createdAt.toDate().toISOString(),
            updatedAt: userData.updatedAt.toDate().toISOString(),
          }
        : {
            uid: user.uid,
            email: user.email,
          };

      dispatch(loginSuccess({ token, expirationToken }));
      dispatch(setUserData(serializedUserData));

      Toast.show({
        type: 'success',
        text1: t('loginSuccessful'),
        text2: t('welcomeToGmsApp'),
        position: 'top',
        visibilityTime: 5000,
      });

      if (!userData?.isProfileComplete) {
        replace(navigationRoutes.MAIN_NAVIGATOR, {
          screen: navigationRoutes.PROFILE_SETUP,
        });
      } else {
        replace(navigationRoutes.MAIN_NAVIGATOR, {
          screen: navigationRoutes.BOTTOM_TAB_NAVIGATOR,
        });
      }
    } catch (error: any) {
      let errorTitle = t('unableToLogin');
      let errorMessage = t('pleaseTryAgain');

      switch (error.code) {
        case 'auth/invalid-email':
          errorTitle = t('invalidEmail');
          errorMessage = t('invalidEmailMessage');
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
        case 'auth/too-many-requests':
          errorTitle = t('tooManyRequests');
          errorMessage = t('tooManyRequestsMessage');
          break;
        case 'auth/network-request-failed':
          errorTitle = t('networkError');
          errorMessage = t('networkErrorMessage');
          break;
        case 'auth/invalid-credential':
          errorTitle = t('invalidCredential');
          errorMessage = t('invalidCredentialMessage');
          break;
        default:
          break;
      }

      Toast.show({
        type: 'error',
        text1: errorTitle,
        text2: errorMessage,
        position: 'top',
        visibilityTime: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LoadingModal visible={isLoading} />
      <ScrollView
        scrollEnabled={isKeyboardVisible}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Heading1 style={styles.headerPrimaryText}>
              {t('gms')}
              <SubHeading style={styles.headerSecondaryText}>{t('fit')}</SubHeading>
            </Heading1>
            <Body1 style={styles.additionalText}>{t('everyBodyCanTrain')}</Body1>
          </View>

          <View style={styles.inputContainer}>
            <Heading2 style={styles.welcomeText}>{t('welcomeBack!')}</Heading2>

            <Controller
              control={control}
              name={INPUT_FIELDS.email}
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputWrapper}>
                  <InputWithIcons
                    ref={emailRef}
                    leftIcon={emailIcon}
                    placeholder={t('email')}
                    keyboardType="email-address"
                    value={value}
                    onChangeText={(text: string) => {
                      onChange(text);
                      clearErrors('email');
                    }}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef?.current?.focus()}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name={INPUT_FIELDS.password}
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputWrapper}>
                  <InputWithIcons
                    ref={passwordRef}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    leftIcon={passwordIcon}
                    rightIcon={isEyeClicked ? eye : hide}
                    placeholder={t('password')}
                    value={value}
                    onChangeText={(text: string) => {
                      onChange(text);
                      clearErrors('password');
                    }}
                    secureTextEntry={!isEyeClicked}
                    onIconPress={() => setIsEyeClicked((prev) => !prev)}
                  />
                </View>
              )}
            />

            <Pressable
              style={({ pressed }) => [
                styles.forgotPasswordContainer,
                pressed && styles.pressed,
              ]}
              onPress={navigateToForgotPassword}
            >
              <Body2 style={styles.forgotPasswordText}>{t('forgetPassword')}</Body2>
            </Pressable>
          </View>

          <View style={styles.socialLogins}>
            <SocialLogin
              buttonLabel={t('login')}
              label={t('register')}
              onPress={handleSubmit(onSubmit)}
              screen="Login"
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              footerText={t('doNotHaveAccount')}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

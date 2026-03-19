import { yupResolver } from '@hookform/resolvers/yup';
import { getAuth } from '@react-native-firebase/auth';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, Pressable, KeyboardAvoidingView, Platform, Keyboard, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import InputWithIcons from '../../../components/InputWithIcons';
import LoadingModal from '../../../components/LoadingModal';
import SocialLogin from '../../../components/SocialLogin';
import { Body3, ErrorText, Heading2, Other } from '../../../components/TextComponents';
import { storeCompleteUserProfile } from '../../../firebase/UserData';
import { loginSuccess } from '../../../screens/Auth/authSlice';
import { emailIcon, passwordIcon, phoneIcon, profile, tick } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { INPUT_FIELDS } from '../../../utilities/constants/others';
import { getExpirationToken } from '../../../utilities/helper/calculation';
import { replace } from '../../../utilities/navigationService';
import { validateRegistration } from '../../../utilities/validators/validateRegistration';
import { setUserData } from '../../Application/ProfileTab/userSlice';

import { styles } from './styles';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

const SignUp : React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [keyBoardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const schema = validateRegistration(t);

  const inputRefs = {
    fullName: useRef<any>(null),
    phone: useRef<any>(null),
    email: useRef<any>(null),
    password: useRef<any>(null),
  };

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [setKeyboardVisible]);

  const handleRegister = useCallback(async (data: FormData) => {
    if (!isChecked) {
      Toast.show({
        type: 'error',
        text1: t('terms'),
        text2: t('acceptTerms'),
      });
      return;
    }
    setIsLoading(true);
    try {
      const { email, password, fullName, phone } = data;
      const authInstance = getAuth();
      const userCredential = await authInstance.createUserWithEmailAndPassword(email, password);
      const { uid } = userCredential.user;

      const newUserData = {
        uid,
        email,
        fullName,
        phone,
        createdAt: new Date().toISOString(),
      };

      await storeCompleteUserProfile(newUserData);

      const token = await authInstance.currentUser?.getIdToken();

      if (token) {
        dispatch(loginSuccess({
          token,
          expirationToken: getExpirationToken(),
        }));
      }

      dispatch(setUserData(newUserData));

      Toast.show({
        type: 'success',
        text1: t('signupSuccess'),
        text2: t('welcomeToGmsApp'),
      });

      replace(navigationRoutes.MAIN_NAVIGATOR, {
        screen: navigationRoutes.PROFILE_SETUP,
      });
    } catch (error: any) {
      let errorTitle = t('signupError');
      let errorMessage = error.message;

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorTitle = t('emailInUse');
          errorMessage = t('emailInUseMessage');
          break;
        case 'auth/invalid-email':
          errorTitle = t('invalidEmail');
          errorMessage = t('invalidEmailMessage');
          break;
        case 'auth/operation-not-allowed':
          errorTitle = t('operationNotAllowed');
          errorMessage = t('operationNotAllowedMessage');
          break;
        case 'auth/weak-password':
          errorTitle = t('weakPassword');
          errorMessage = t('weakPasswordMessage');
          break;
        case 'auth/too-many-requests':
          errorTitle = t('tooManyRequests');
          errorMessage = t('tooManyRequestsMessage');
          break;
        case 'auth/network-request-failed':
          errorTitle = t('networkError');
          errorMessage = t('networkErrorMessage');
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
  }, [isChecked, t, dispatch]);

  const handleSubmitEditing = (nextRef: React.RefObject<any>) => () => {
    nextRef.current?.focus();
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LoadingModal visible={isLoading} />
      <ScrollView
        scrollEnabled={keyBoardVisible}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        <View style={styles.headerContainer}>
          <Heading2 style={styles.headerPrimaryText}>{t('hey')}</Heading2>
          <Heading2 style={styles.headerSecText}>{t('createAccount')}</Heading2>
        </View>

        <View style={styles.inputContainer}>

          <Controller
            control={control}
            name={INPUT_FIELDS.fullName}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <InputWithIcons
                  ref={inputRefs.fullName}
                  placeholder={t('fullName')}
                  leftIcon={profile}
                  value={value}
                  onChangeText={(text: string) => {
                    onChange(text);
                    clearErrors('fullName');
                  }}
                  keyboardType="default"
                  returnKeyType="next"
                  onSubmitEditing={handleSubmitEditing(inputRefs.phone)}
                />
                {errors.fullName && (
                  <ErrorText style={[styles.errorText, styles.errorContainer]}>
                    {errors.fullName.message}
                  </ErrorText>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name={INPUT_FIELDS.phone}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <InputWithIcons
                  ref={inputRefs.phone}
                  placeholder={t('phoneNumber')}
                  leftIcon={phoneIcon}
                  value={value}
                  onChangeText={(text: string) => {
                    onChange(text);
                    clearErrors('phone');
                  }}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={handleSubmitEditing(inputRefs.email)}
                />
                {errors.phone && (
                  <ErrorText style={[styles.errorText, styles.errorContainer]}>
                    {errors.phone.message}
                  </ErrorText>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name={INPUT_FIELDS.email}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <InputWithIcons
                  ref={inputRefs.email}
                  placeholder={t('email')}
                  leftIcon={emailIcon}
                  value={value}
                  onChangeText={(text: string) => {
                    onChange(text);
                    clearErrors('email');
                  }}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={handleSubmitEditing(inputRefs.password)}
                />
                {errors.email && (
                  <ErrorText style={[styles.errorText, styles.errorContainer]}>
                    {errors.email.message}
                  </ErrorText>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name={INPUT_FIELDS.password}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <InputWithIcons
                  ref={inputRefs.password}
                  placeholder={t('password')}
                  leftIcon={passwordIcon}
                  value={value}
                  onChangeText={(text: string) => {
                    onChange(text);
                    clearErrors('password');
                  }}
                  keyboardType="default"
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
                {errors.password && (
                  <ErrorText style={[styles.errorText, styles.errorContainer]}>
                    {errors.password.message}
                  </ErrorText>
                )}
              </View>
            )}
          />

          <View style={styles.privacyContainer}>
            <Pressable style={styles.rectangleBox} onPress={() => setIsChecked((prev) => !prev)}>
              <View style={[styles.rectangle, isChecked && styles.checkedBox]}>
                {isChecked && <Image source={tick} style={styles.checkMark} />}
              </View>
              <Other style={styles.privacyTextContainer}>
                <Body3 style={styles.privacyText}>{t('privacy')}</Body3>
                <Body3 style={[styles.privacyText, styles.underline]}>{t('privacyPolicyText')}</Body3>
                <Body3 style={styles.privacyText}>{t('and')}</Body3>
                <Body3 style={[styles.privacyText, styles.underline]}>{t('termsUse')}</Body3>
              </Other>
            </Pressable>
          </View>
        </View>

        <View style={styles.socialLoginContainer}>
          <SocialLogin
            buttonLabel={t('register')}
            label={t('login')}
            onPress={handleSubmit(handleRegister)}
            screen="Register"
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            footerText={t('already')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
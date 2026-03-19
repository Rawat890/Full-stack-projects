import { yupResolver } from '@hookform/resolvers/yup';
import { getApp } from '@react-native-firebase/app';
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import InputWithIcons from '../../../components/InputWithIcons';
import { ErrorText, Heading1 } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import { emailIcon } from '../../../utilities/constants/images';

import { styles } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email(t('invalidEmailMessage'))
      .required(t('emailRequired')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const { email } = data;
    try {
      const authInstance = getAuth(getApp());
      await sendPasswordResetEmail(authInstance, email);
      Toast.show({
        type: 'success',
        text1: t('resetEmailSent'),
        text2: t('checkEmailResetLink'),
        visibilityTime: 5000,
      });
    } catch (error: any) {
      let errorTitle = t('failedResetEmail');
      let errorMessage = t('checkNetworkConnection');

      switch (error.code) {
        case 'auth/invalid-email':
          errorTitle = t('invalidEmail');
          errorMessage = t('invalidEmailMessage');
          break;
        case 'auth/user-not-found':
          errorTitle = t('userNotFound');
          errorMessage = t('userNotFoundMessage');
          break;
        case 'auth/too-many-requests':
          errorTitle = t('tooManyRequests');
          errorMessage = t('tooManyRequestsMessage');
          break;
        case 'auth/network-request-failed':
          errorTitle = t('networkError');
          errorMessage = t('networkErrorMessage');
          break;
        case 'auth/operation-not-allowed':
          errorTitle = t('operationNotAllowed');
          errorMessage = t('operationNotAllowedMessage');
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
    }
  };

  return (
    <View style={styles.container}>
      <Heading1 style={styles.headerText}>{t('forgetPassword')}</Heading1>
      <View style={styles.input}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputWithIcons
              leftIcon={emailIcon}
              keyboardType="email-address"
              placeholder={t('email')}
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
        />
        {errors.email && <ErrorText style={styles.errorText}>{errors.email.message}</ErrorText>}
      </View>

      <View style={styles.btn}>
        <TextUniversalButton label={t('sendMail')} onPress={handleSubmit(onSubmit)} textColor={null}/>
      </View>
    </View>
  );
};

export default ForgotPassword;

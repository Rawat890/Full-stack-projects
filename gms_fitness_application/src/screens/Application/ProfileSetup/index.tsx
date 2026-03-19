import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, Image, Pressable, KeyboardAvoidingView, Platform, Keyboard, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import InputWithUnit from '../../../components/InputWithUnit';
import { Body2, Body3, ErrorText, Heading2, Other } from '../../../components/TextComponents';
import { storeCompleteUserProfile } from '../../../firebase/UserData';
import { calendar, cmUnit, kgUnit, profile, profileDataFrame, swapIcon, weight, whiteArrow } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { goBack, replace } from '../../../utilities/navigationService';
import { validateProfile } from '../../../utilities/validators/validateProfile';
import { updateUserProfile } from '../ProfileTab/userSlice';

import PickDate from './components/PickDate';
import PickGender from './components/PickGender';
import { styles } from './styles';

type ProfileSetupProps = {
  route?: any;
};

type ProfileFormData = {
  gender: string;
  dob: Date;
  weight: string;
  height: string;
};

interface UserData {
  uid?: string;
  gender?: string;
  weight?: number;
  height?: number;
  dob?: string;
  isProfileComplete?: boolean;
}

interface RootState {
  user: {
    userData?: UserData;
  };
}

const ProfileSetup: React.FC<ProfileSetupProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const schema = validateProfile(t);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      if (!userData?.uid) {
        Toast.show({
          type: 'error',
          text1: t('user_data_missing'),
        });
        return;
      }
      const completeUserData = {
        ...userData,
        gender: data.gender,
        weight: Number(data.weight),
        height: Number(data.height),
        dob: data.dob.toISOString(),
        isProfileComplete: true,
      };

      await storeCompleteUserProfile(completeUserData);
      dispatch(updateUserProfile(completeUserData));

      Toast.show({
        type: 'success',
        text1: t('dataSavedSuccessfully'),
        text2: t('letsMoveToFitnessJourney'),
      });
      replace(navigationRoutes.GOAL_SLIDER);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('failedToSaveProfileData'),
        text2: t('unableRequest'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Body3>{t('loadUserData')}</Body3>
        <Pressable onPress={goBack}>
          <Body3>{t('goBack')}</Body3>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >

        <View style={styles.container}>
          <Image style={styles.frame1} source={profileDataFrame} resizeMode="contain" />

          <View style={styles.textContainer}>
            <Heading2 style={styles.primaryText}>{t('profile')}</Heading2>
            <Body2 style={styles.secondaryText}>{t('moreAbout')} </Body2>
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <PickGender
                  value={value}
                  onChange={onChange}
                  icon={profile}
                />
              )}
            />

            <Controller
              control={control}
              name="dob"
              render={({ field: { onChange, value } }) => (
                <>
                  <PickDate source={calendar} value={value} onChange={onChange} />
                  {errors.dob && (
                    <ErrorText style={[styles.errorText]} >{errors.dob.message}</ErrorText>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="weight"
              render={({ field: { onChange, value } }) => (
                <>
                  <InputWithUnit
                    placeholder={t('yourWeight')}
                    source={weight}
                    value={value}
                    unit={kgUnit}
                    onChangeText={onChange}
                    keyboard="number-pad"
                  />
                  {errors.weight && (
                    <ErrorText style={[styles.errorText]} >{errors.weight.message}</ErrorText>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="height"
              render={({ field: { onChange, value } }) => (
                <>
                  <InputWithUnit
                    placeholder={t('yourHeight')}
                    source={swapIcon}
                    value={value}
                    unit={cmUnit}
                    onChangeText={onChange}
                    keyboard="number-pad"
                  />
                  {errors.height && (
                    <ErrorText style={[styles.errorText]} >{errors.height.message}</ErrorText>
                  )}
                </>
              )}
            />
          </View>

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Other style={styles.btnText} >{t('next')}</Other>
            <Image source={whiteArrow} style={styles.arrowIcon} />
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileSetup;

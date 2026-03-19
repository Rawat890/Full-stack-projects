import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ANIMATIONS } from 'utilities/constants/others';

import { Body3, Heading2, Heading3, Other, SubHeading } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { navigate } from '../../../utilities/navigationService';
import { setBmiValue } from '../BmiCalculator/bmiSlice';
import { fetchSchedules } from '../ScheduleWorkout/scheduleSlice';

import LatestWorkoutList from './components/LatestWorkoutList';
import { styles } from './styles';

type HomeTabProps = {
  route: any
}

interface RootState {
  user: {
    userData?: {
      fullName?: string;
      height?: number;
      weight?: number;
    };
  };
  schedules: {
    items: any[];
  };
  bmi: {
    value?: number;
    category?: string;
  };
}

const HomeTab: React.FC<HomeTabProps> = ({ route }) => {
  const { userData } = useSelector((state:RootState) => state.user);
  const { fullName } = userData || {};
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { items: schedules } = useSelector((state: RootState) => state.schedules);

  useEffect(() => {
    dispatch(fetchSchedules());

    if (!userData?.height || !userData?.weight) { return; }

    const heightInMeters: number = userData.height / 100;
    const weight: number = userData.weight;

    if (heightInMeters <= 0 || weight <= 0) { return; }

    const bmiValue: number = weight / (heightInMeters * heightInMeters);
    const roundedBmi = bmiValue.toFixed(1);

    let category: string = '';
    if (bmiValue < 18.5) { category = t('underweight'); }
    else if (bmiValue < 25) { category = t('normalWeight'); }
    else if (bmiValue < 30) { category = t('overweight'); }
    else { category = t('obese'); }

    dispatch(setBmiValue({ value: roundedBmi, category }));
  }, [dispatch, t, userData]);

  function navigateToActivity() {
    navigate(navigationRoutes.ACTIVITY_TAB);
  }

  function navigateToBmiScreen() {
    navigate(navigationRoutes.BMI);
  }

  const { value: bmiValue, category: bmiCategory } = useSelector((state: RootState) => state.bmi);

  return (
    <View style={styles.homeTabOuterContainer}>
      <View style={styles.homeTabInnerContainer}>
        <View style={styles.headerContainer}>
          <View>
            <Other style={styles.headerWelcomeText}>{t('welcomeBack') + ','}</Other>
            <Heading2 style={styles.userName}>{fullName}</Heading2>
          </View>
          <LottieView
            source={ANIMATIONS.gym}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        <View style={styles.bmiContainer}>
          <View style={styles.bmiInnerContainer1}>
            <Heading3 style={styles.bmiText}>{t('bmi')}</Heading3>
            <SubHeading style={styles.bmiSecondaryText}>{`${t('category')} - ${bmiCategory || t('normalWeight')}`}</SubHeading>
            <View style={styles.smallBtn}>
              <TextUniversalButton label={t('view')} onPress={navigateToBmiScreen} compact />
            </View>
          </View>
          <View style={styles.circle}>
            <Other style={styles.circleText}>{bmiValue || 20.1}</Other>
          </View>
        </View>

        <View style={styles.targetTextContainer}>
          <Body3 style={styles.targetText}>{t('todayTarget')}</Body3>
          <View style={styles.checkBtn}>
            <TextUniversalButton label={t('check')} onPress={navigateToActivity} compact />
          </View>
        </View>

        <View style={styles.workoutContainer}>
          <View style={styles.latestWorkoutContainer}>
            <Heading3 style={styles.latestWorkoutText}>{t('latestWorkout')}</Heading3>
            <Pressable
              style={({ pressed }) => [pressed && styles.pressed]}
              onPress={navigateToActivity}
            >
              <Other style={styles.seeMoreText}>{t('seeMore')}</Other>
            </Pressable>
          </View>

          <View style={styles.workoutContainer}>
            {schedules.length === 0 ? (
              <>
                <Other style={styles.icon}>🏋‍♀</Other>
                <Other style={styles.noScheduledText}>{t('noWorkoutsScheduled')}</Other>

              </>
            ) : (
              <LatestWorkoutList data={schedules} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeTab;

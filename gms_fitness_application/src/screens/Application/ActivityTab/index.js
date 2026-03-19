import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Heading2 } from '../../../components/TextComponents';
import { crunches, dumbbell, upperBody } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { navigate } from '../../../utilities/navigationService';

import ActivityType from './components/ActivityType';
import { styles } from './styles';

const ActivityTab = () => {
  const { t } = useTranslation();
  function navigateToWorkOutTracker() {
    navigate(navigationRoutes.TRACK_WORKOUT);
  }
  function navigateToSleepTracker() {
    navigate(navigationRoutes.TRACK_SLEEP);
  }
  function navigateToVideos() {
    navigate(navigationRoutes.VIDEO_SCREEN);
  }

  return (
    <View style={styles.mainContainer}>
      <Heading2 style={styles.activityText}>{t('activityTracker')}</Heading2>
      <ActivityType label={t('workoutTracker')} info1={t('exercises12')} info2={t('minutes40')} onPress={navigateToWorkOutTracker} source={dumbbell} />
      <ActivityType label={t('workoutVideos')} info1={t('videoCount')} info2={t('workout')} source={upperBody} onPress={navigateToVideos} />
      <ActivityType label={t('sleepTracker')} info1={t('exercises14')} info2={t('minutes20')} source={crunches} onPress={navigateToSleepTracker} />
    </View>
  );
};

export default ActivityTab;

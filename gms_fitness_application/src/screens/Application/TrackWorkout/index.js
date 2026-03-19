import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ScreenHeader from '../../../components/ScreenHeader';
import { Body2, Body3, Heading3 } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import { fetchSchedules, removeSchedule } from '../../../screens/Application/ScheduleWorkout/scheduleSlice';
import { skipping, upperBody } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { OTHERS } from '../../../utilities/constants/others';
import { navigate } from '../../../utilities/navigationService';

import UpcomingWorkout from './components/UpcomingWorkout';
import WorkoutType from './components/WorkoutType';
import { styles } from './styles';

const TrackWorkout = () => {
  const dispatch = useDispatch();
  const { items: schedules } = useSelector((state) => state.schedules);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  const navigateToScheduleWorkout = () => {
    navigate(navigationRoutes.BOTTOM_TAB_NAVIGATOR, { screen: navigationRoutes.HOME_TAB });
  };

  function navigateToHome() {
    navigate(navigationRoutes.BOTTOM_TAB_NAVIGATOR, { screen: navigationRoutes.HOME_TAB });
  }
  const handleDeleteSchedule = (scheduleId) => {
    dispatch(removeSchedule(scheduleId));
  };

  const sortedSchedules = [...schedules].sort((a, b) =>
    new Date(b.date) - new Date(a.date),
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      nestedScrollEnabled
    >
      <View style={styles.header}>
        <ScreenHeader title={t('workoutTracker')} />
      </View>
      <View style={styles.content}>

        <View style={styles.dailySchedule}>
          <Body2 style={styles.dailyText}>{t('dailyWorkoutSchedule')}</Body2>
          <TextUniversalButton label={t('check')} onPress={navigateToScheduleWorkout} compact />
        </View>

        <View style={styles.upcomingSchedule}>
          <Body2 style={styles.upcomingText1}>{t('upcomingWorkout')}</Body2>

          <Pressable onPress={navigateToHome}>
            <Body3 style={styles.seeMoreText}>{t('seeMore')}</Body3>

          </Pressable>
        </View>

        {sortedSchedules.length === OTHERS.min_length ? (
          <Body2 style={styles.noWorkout}>{`❚█══█❚  ${t('noWorkoutScheduled')}`}</Body2>

        ) : (
          <ScrollView
            style={styles.upcomingScrollContainer}
            contentContainerStyle={styles.upcomingScrollContent}
            nestedScrollEnabled
          >
            {sortedSchedules.slice(0, 6).map((schedule) => (
              <UpcomingWorkout
                key={schedule.id}
                id={schedule.id}
                heading={schedule.workoutType}
                time={schedule.time}
                date={schedule.date}
                source={schedule.workoutType.includes('Upper') ? upperBody : skipping}
                onDelete={handleDeleteSchedule}
              />
            ))}
          </ScrollView>
        )}

        <View style={styles.training}>
          <Heading3 style={styles.trainText}>{t('whatToTrain')}</Heading3>

          <WorkoutType />
        </View>
      </View>
    </ScrollView>
  );
};

export default TrackWorkout;

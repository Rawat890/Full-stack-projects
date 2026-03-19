import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ScreenHeader from '../../../components/ScreenHeader';
import { Body2 } from '../../../components/TextComponents';
import { convertToDateOnly } from '../../../utilities/helper/dateFunctions';
import { fetchSleepSchedules } from '../SleepSchedule/sleepSlice';

import CurrentSleepSchedule from './components/CurrentSleepSchedule';
import NoSleepSchedule from './components/NoSleepSchedule';
import PickDateHorizontally from './components/PickDateHorizontally';
import SleepInformation from './components/SleepInformation';
import { styles } from './styles';

const SleepSchedule = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isClicked, setIsClicked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [selectedDate, setSelectedDate] = useState(convertToDateOnly(new Date()));
  const [hideSchedule, setHideSchedule] = useState(false);

  const schedules = useSelector((state) => state.sleep?.schedules || []);
  const status = useSelector((state) => state.sleep?.status || 'idle');

  const today = convertToDateOnly(new Date());
  const todaysSchedule = schedules.find(schedule => {
    const scheduleDate = convertToDateOnly(new Date(schedule.date));
    return scheduleDate === today;
  });

  useEffect(() => {
    dispatch(fetchSleepSchedules());
  }, [dispatch]);

  useEffect(() => {
    if (!todaysSchedule) { return; }

    const updateProgress = () => {
      const now = new Date();
      const bedtime = new Date(todaysSchedule.bedtime);
      const wakeTime = new Date(todaysSchedule.wakeTime);

      if (wakeTime < bedtime) {
        wakeTime.setDate(wakeTime.getDate() + 1);
      }

      const totalDuration = wakeTime - bedtime;
      const elapsed = now - bedtime;

      if (now >= wakeTime) {
        setProgress(1);
        setIsCompleted(true);
        setTimeLeft('');
      } else if (now >= bedtime) {
        const newProgress = elapsed / totalDuration;
        setProgress(newProgress);
        setIsCompleted(false);

        const timeLeftMs = wakeTime - now;
        const hours = Math.floor(timeLeftMs / 3600000);
        const minutes = Math.floor((timeLeftMs % 3600000) / 60000);
        setTimeLeft(`${hours}h ${minutes}m ${t('remaining')}`);
      } else {
        setProgress(0);
        setIsCompleted(false);

        const untilStart = bedtime - now;
        const hours = Math.floor(untilStart / 3600000);
        const minutes = Math.floor((untilStart % 3600000) / 60000);
        setTimeLeft(`${t('startsIn')} ${hours}h ${minutes}m`);
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000);
    return () => clearInterval(interval);
  }, [todaysSchedule, t]);


  if (status === 'loading') {
    return (
      <View style={styles.centered}>
        <Body2 style={styles.loading}>{t('loadingSleeps')} </Body2>
      </View>
    );
  }

  return (
    <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <ScreenHeader title={t('sleepSchedule')} />
      </View>
      <SleepInformation isClicked={isClicked} setIsClicked={setIsClicked} />
      <PickDateHorizontally selectedDate={selectedDate} onDateChange={setSelectedDate} />

      {todaysSchedule && !hideSchedule ? (
        <CurrentSleepSchedule
          schedule={todaysSchedule}
          progress={progress}
          isCompleted={isCompleted}
          timeLeft={timeLeft}
          onHideSchedule={() => setHideSchedule(true)}
          t={t}
        />
      ) : (
        <NoSleepSchedule
          selectedDate={convertToDateOnly(selectedDate)}
          onSchedule={() => setHideSchedule(false)}
          t={t}
        />
      )}

    </ScrollView>
  );
};

export default SleepSchedule;

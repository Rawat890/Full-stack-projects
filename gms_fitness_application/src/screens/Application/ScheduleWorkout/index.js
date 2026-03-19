import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable, Image } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import ScreenHeader from '../../../components/ScreenHeader';
import { workout_schedule_button } from '../../../utilities/constants/images';
import { push } from '../../../utilities/navigationService';
import { fetchSchedules, markScheduleAsDone, removeSchedule } from '../ScheduleWorkout/scheduleSlice';

import WorkoutListScheduled from './components/WorkoutListScheduled';
import WorkoutPopupModal from './components/WorkoutPopupModal';
import { styles } from './styles';

const ScheduleWorkout = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { workoutName, difficulty } = route.params;
  const { items: schedules } = useSelector((state) => state.schedules);

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  const onDateChange = (date) => setSelectedDate(date);

  const filteredSchedules = useMemo(() => {
    const target = selectedDate ? new Date(selectedDate) : new Date();
    return schedules.filter((s) => {
      const d = new Date(s.date);
      return (
        d.getDate() === target.getDate() &&
        d.getMonth() === target.getMonth() &&
        d.getFullYear() === target.getFullYear()
      );
    });
  }, [schedules, selectedDate]);

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
    setIsPopupVisible(true);
  };

  const handleMarkAsDone = async () => {
    try {
      await dispatch(markScheduleAsDone(selectedWorkout.id)).unwrap();
      setIsPopupVisible(false);
    } catch {
      Toast.show({
        type: 'error',
        text1: t('unableToMarkDone'),
        text2: t('checkNetworkConnection'),
      });
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(removeSchedule(selectedWorkout.id)).unwrap();
      setIsPopupVisible(false);
    } catch {
      Toast.show({
        type: 'error',
        text1: t('failedToDeleteWorkout'),
      });
    }
  };

  const handleAddPress = () => {
    push('AddSchedule', {
      selected: workoutName,
      difficulty,
      selectedDate: selectedDate ? selectedDate.toISOString() : new Date().toISOString(),
      onSave: (date) => {
        setSelectedDate(new Date(date));
        dispatch(fetchSchedules());
      },
    });
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <ScreenHeader title={t('workoutSchedule')} />

        <CalendarPicker
          onDateChange={onDateChange}
          selectedStartDate={selectedDate || new Date()}
          style={styles.calendar}
          selectedDayStyle={styles.calendarDay}
          selectedDayTextStyle={styles.calendarDayText}
          minDate={new Date()}
        />
      </View>

      <WorkoutListScheduled data={filteredSchedules} onWorkoutPress={handleWorkoutSelect} />

      <Pressable
        style={({ pressed }) => [
          styles.floatingAddButton,
          pressed && styles.pressed,
        ]}
        onPress={handleAddPress}
      >
        <Image source={workout_schedule_button} style={styles.addImage} />
      </Pressable>

      <WorkoutPopupModal
        visible={isPopupVisible}
        workout={selectedWorkout}
        onClose={() => setIsPopupVisible(false)}
        onDelete={handleDelete}
        onMarkDone={handleMarkAsDone}
      />
    </View>
  );
};

export default ScheduleWorkout;

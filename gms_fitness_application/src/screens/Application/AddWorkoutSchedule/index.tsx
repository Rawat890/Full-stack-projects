import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, Pressable, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import PickOption from '../../../components/PickOption';
import PressableImage from '../../../components/PressableImage';
import { Heading2, Other } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import { updateSchedule } from '../../../firebase/ScheduleData';
import { createSchedule } from '../../../screens/Application/ScheduleWorkout/scheduleSlice';
import { barbell, calendar, close, difficultyIcon, reps, right } from '../../../utilities/constants/images';
import { OTHERS } from '../../../utilities/constants/others';
import { pop } from '../../../utilities/navigationService';

import { styles } from './styles';

interface ScheduleData {
  id?: string;
  date: string;
  workoutType: string;
  difficulty: string;
  reps: string;
  weight: string;
}

interface RouteParams {
  selected?: string;
  difficulty?: string;
  selectedDate?: string;
  scheduleData?: ScheduleData;
  selectedWorkout?: string;
  onSave?: (date: string) => void;
}

interface Props {
  route: {
    params?: RouteParams;
  };
}

const AddWorkoutSchedule: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    selected,
    difficulty,
    selectedDate,
    scheduleData,
    selectedWorkout: routeSelectedWorkout,
    onSave,
  } = route.params || {};

  const [date, setDate] = useState<Date>(selectedDate ? new Date(selectedDate) : new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState<boolean>(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>(difficulty);
  const [selectedWorkout, setSelectedWorkout] = useState<string | undefined>(selected);
  const [selectedReps, setSelectedReps] = useState<string>('8 Reps');
  const [selectedWeight, setSelectedWeight] = useState<string>('2.5 Kg');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (scheduleData) {
      setDate(new Date(scheduleData.date));
      setSelectedWorkout(scheduleData.workoutType);
      setSelectedDifficulty(scheduleData.difficulty);
      setSelectedReps(scheduleData.reps);
      setSelectedWeight(scheduleData.weight);
      setScheduleId(scheduleData.id || null);
      setIsEditing(true);
    } else if (routeSelectedWorkout) {
      setSelectedWorkout(routeSelectedWorkout);
    }
  }, [scheduleData, routeSelectedWorkout]);

  const workoutInfo = useMemo(() => {
    switch (selectedWorkout) {
      case 'FullBody Workout':
        return {
          imageUrl: OTHERS.fullBody_url,
          calories_burn: OTHERS.fullBody_calories,
          exerciseTime: OTHERS.fullBody_exerciseTime,
        };
      case 'AB Workout':
        return {
          imageUrl: OTHERS.ab_url,
          calories_burn: OTHERS.ab_calories,
          exerciseTime: OTHERS.ab_exerciseTime,
        };
      default:
        return {
          imageUrl: OTHERS.lower_url,
          calories_burn: OTHERS.lower_calories,
          exerciseTime: OTHERS.lower_exerciseTime,
        };
    }
  }, [selectedWorkout]);

  const showDatePicker = useCallback(() => setDatePickerVisibility(true), []);
  const hideDatePicker = useCallback(() => setDatePickerVisibility(false), []);
  const showTimePicker = useCallback(() => setTimePickerVisibility(true), []);
  const hideTimePicker = useCallback(() => setTimePickerVisibility(false), []);

  const handleDateConfirm = useCallback(
    (selectedDate: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selection = new Date(selectedDate);
      selection.setHours(0, 0, 0, 0);

      if (selection < today) {
        Toast.show({
          type: 'error',
          text1: t('cannotSetScheduleInPast'),
          text2: t('chooseDate'),
        });
      } else {
        setDate((prev) => {
          const newDate = new Date(selectedDate);
          newDate.setHours(prev.getHours(), prev.getMinutes());
          return newDate;
        });
      }
      hideDatePicker();
    },
    [hideDatePicker, t],
  );

  const handleTimeConfirm = useCallback(
    (selectedTime: Date) => {
      setDate((prev) => {
        const newDate = new Date(prev);
        newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
        return newDate;
      });
      hideTimePicker();
    },
    [hideTimePicker],
  );

  const handleSaveSchedule = useCallback(async () => {
    try {
      const scheduleDataPayload = {
        date: date.toISOString(),
        workoutType: selectedWorkout,
        difficulty: selectedDifficulty,
        reps: selectedReps,
        weight: selectedWeight,
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        completed: false,
        ...workoutInfo,
      };

      if (isEditing && scheduleId) {
        await dispatch(updateSchedule({ id: scheduleId, ...scheduleDataPayload })).unwrap()
        Toast.show({
          type: 'success',
          text1: t('workoutUpdatedSuccessfully'),
        });
      } else {
        await dispatch(createSchedule(scheduleDataPayload)).unwrap();
        Toast.show({
          type: 'success',
          text1: t('workoutScheduledSuccessfully'),
        });
        if (onSave) {
          onSave(scheduleDataPayload.date);
        }
      }
      pop();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('failedToSaveWorkoutSchedule'),
        text2: t('checkNetworkConnection'),
      });
    }
  }, [date, selectedWorkout, selectedDifficulty, selectedReps, selectedWeight, isEditing, scheduleId, dispatch, t, workoutInfo, onSave]);

  return (
    <View style={styles.container}>
      {openDropdown && (
        <Pressable style={styles.backdrop} onPress={() => setOpenDropdown(null)} />
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <PressableImage
            onPress={pop}
            source={close}
            pressableStyle={styles.closeButton}
            imageStyle={styles.close}
          />

          <Other style={styles.addScheduleText}>
            {isEditing ? t('editSchedule') : t('addSchedule')}
          </Other>
          <View />
        </View>

        <Pressable onPress={showDatePicker} style={styles.dateButton}>
          <Image source={calendar} style={styles.image} />
          <Other style={styles.dateText}>{date.toDateString()}</Other>
        </Pressable>

        <View style={styles.timeContainer}>
          <Pressable onPress={showTimePicker} style={styles.timeButton}>
            <Other style={styles.time}>
              {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Other>
          </Pressable>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={date}
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          date={date}
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />

        <View style={styles.detailsContainer}>
          <Heading2 style={styles.detailsText}>{t('detailsWorkout')}</Heading2>

          <PickOption
            options={[t('fullbody'), t('lowerbody'), t('abWorkout')]}
            selectedValue={selectedWorkout}
            onValueChange={setSelectedWorkout}
            label={t('chooseWorkout')}
            source1={barbell}
            source2={right}
            isOpen={openDropdown === 'workout'}
            onToggle={(isOpen: boolean) => setOpenDropdown(isOpen ? 'workout' : null)}
          />

          <PickOption
            selectedValue={selectedDifficulty}
            onValueChange={setSelectedDifficulty}
            options={[t('easy'), t('intermediate'), t('hard')]}
            label={t('difficulty')}
            source1={difficultyIcon}
            source2={right}
            isOpen={openDropdown === 'difficulty'}
            onToggle={(isOpen: boolean) => setOpenDropdown(isOpen ? 'difficulty' : null)}
          />

          <PickOption
            options={[t('reps8'), t('reps12'), t('reps15'), t('reps25')]}
            selectedValue={selectedReps}
            onValueChange={setSelectedReps}
            label={t('customReps')}
            source1={reps}
            source2={right}
            isOpen={openDropdown === 'reps'}
            onToggle={(isOpen) => setOpenDropdown(isOpen ? 'reps' : null)}
          />

          <PickOption
            options={[t('kilo2.5'), t('kilo5'), t('kilo7.5'), t('kilo10')]}
            selectedValue={selectedWeight}
            onValueChange={setSelectedWeight}
            label={t('customWeight')}
            source1={reps}
            source2={right}
            isOpen={openDropdown === 'weight'}
            onToggle={(isOpen) => setOpenDropdown(isOpen ? 'weight' : null)}
          />
        </View>

        <View style={styles.button}>
          <TextUniversalButton
            label={isEditing ? t('update') : t('saveSchedule')}
            onPress={handleSaveSchedule}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddWorkoutSchedule;

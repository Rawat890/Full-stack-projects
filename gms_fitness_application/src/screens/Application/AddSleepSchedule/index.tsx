import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import PressableImage from '../../../components/PressableImage';
import { Heading1, Other } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import { createSleepSchedule } from '../../../screens/Application/SleepSchedule/sleepSlice';
import { back, bedIcon, clockIcon } from '../../../utilities/constants/images';
import { calculateSleepDuration } from '../../../utilities/helper/calculation';
import { goBack } from '../../../utilities/navigationService';

import { styles } from './styles';

interface RouteParams {
  selectedDate: string;
}

interface Props {
  route: {
    params: RouteParams;
  };
}

interface RootState {
  user: {
    userData?: {
      email?: string;
    };
  };
}

const AddSleepSchedule: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const [bedtime, setBedtime] = useState<Date>(new Date());
  const [wakeTime, setWakeTime] = useState<Date>(new Date());
  const [showBedtimePicker, setShowBedtimePicker] = useState<boolean>(false);
  const [showWakeTimePicker, setShowWakeTimePicker] = useState<boolean>(false);

  const { selectedDate } = route.params;

  const { userData } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const handleSave = () => {
    if (!userData?.email) {
      return;
    }

    const scheduleData = {
      bedtime: bedtime.toISOString(),
      wakeTime: wakeTime.toISOString(),
      duration: calculateSleepDuration(bedtime, wakeTime),
      date: selectedDate,
      email: userData.email,
      createdAt: new Date().toISOString(),
    };

    dispatch(createSleepSchedule(scheduleData))
      .then(goBack)
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: t('failedToSaveSchedule'),
          text2: t('checkNetworkConnection'),
        });
      });
  };

  return (
    <View style={styles.innerContainer}>
      <View style={styles.headerContainer}>
        <PressableImage
          source={back}
          onPress={goBack}
          imageStyle={styles.image}
        />
        <Heading1 style={styles.header}>{t('addSchedule')}</Heading1>
        <View />
      </View>

      <View style={styles.timeContainer}>
        <View style={styles.timeSection}>
          <View style={styles.timeSection1}>
            <Image source={bedIcon} style={styles.icon} />
            <Other style={styles.sectionTitle}>{t('bedtime')}</Other>
          </View>
          <Pressable
            style={styles.timeButton}
            onPress={() => setShowBedtimePicker(true)}
          >
            <Other style={styles.timeText}>
              {bedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Other>
          </Pressable>
        </View>

        <View style={styles.timeSection}>
          <View style={styles.timeSection1}>
            <Image source={bedIcon} style={styles.icon} />
            <Other style={styles.sectionTitle}>{t('wakeTime')}</Other>
          </View>

          <Pressable
            style={styles.timeButton}
            onPress={() => setShowWakeTimePicker(true)}
          >
            <Other style={styles.timeText}>
              {wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Other>
          </Pressable>
        </View>

        <View style={styles.durationSection}>
          <View style={styles.timeSection1}>
            <Image source={clockIcon} style={styles.icon} />
            <Other style={styles.sectionTitle}>{t('sleepHours')}</Other>
          </View>
          <Other style={styles.durationText}>
            {calculateSleepDuration(bedtime, wakeTime)}
          </Other>
        </View>

        {showBedtimePicker && (
          <DateTimePicker
            value={bedtime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event: DateTimePickerEvent, selectedTime?: Date) => {
              setShowBedtimePicker(false);
              if (selectedTime) {
                setBedtime(selectedTime);
              }
            }}
          />
        )}
        {showWakeTimePicker && (
          <DateTimePicker
            value={wakeTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event: DateTimePickerEvent, selectedTime?: Date) => {
              setShowWakeTimePicker(false);
              if (selectedTime) {
                setWakeTime(selectedTime);
              }
            }}
          />
        )}
      </View>

      <View style={styles.button}>
        <TextUniversalButton label={t('addSchedule')} onPress={handleSave} />
      </View>
    </View>
  );
};

export default AddSleepSchedule;

import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import PressableImage from '../../../components/PressableImage';
import { Body1, Body2, Heading1, Heading2, Other } from '../../../components/TextComponents';
import dates from '../../../utilities/constants/dates';
import { back, leftArrow, rightArrow } from '../../../utilities/constants/images';
import { goBack } from '../../../utilities/navigationService';

import { styles } from './styles';

const OnClickSchedule = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState('08:00 AM');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  function handleBackNavigation() {
    goBack();
  }

  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 1; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour % 12 || 12}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeSlots = generateTimeSlots();

  const monthStart = currentDate.startOf('month');
  const monthEnd = currentDate.endOf('month');
  const daysInMonth = [];
  for (let d = monthStart; d.isBefore(monthEnd) || d.isSame(monthEnd, 'day'); d = d.add(1, 'day')) {
    daysInMonth.push(d);
  }

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDateConfirm = (date) => {
    const newDate = dayjs(date);
    setCurrentDate(newDate);
    setSelectedDate(newDate);
    hideDatePicker();
  };

  const handleDayPress = (day) => {
    setSelectedDate(day);
    if (!day.isSame(currentDate, 'month')) {
      setCurrentDate(day);
    }
  };

  const handleTimePress = (time) => {
    setSelectedTime(time);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PressableImage
          onPress={handleBackNavigation}
          source={back}
          imageStyle={styles.image}
        />
        <Heading1 style={styles.header}>{t('workoutSchedule')}</Heading1>
      </View>

      <View style={styles.dateSection}>
        <View style={styles.monthHeader}>
          <PressableImage
            onPress={handlePreviousMonth}
            source={leftArrow}
            pressableStyle={styles.navButton}
            imageStyle={styles.arrows}
          />

          <Pressable onPress={showDatePicker} style={styles.monthTextContainer}>
            <Heading2 style={styles.monthText}>{currentDate.format(dates.MMMM_yyyy)}</Heading2>
          </Pressable>

          <PressableImage
            onPress={handleNextMonth}
            source={rightArrow}
            pressableStyle={styles.navButton}
            imageStyle={styles.arrows}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysContainer}
          snapToInterval={60}
          decelerationRate="fast"
        >
          {daysInMonth.map((day, index) => {
            const isSelected = day.isSame(selectedDate, 'day');
            const isCurrentMonth = day.isSame(currentDate, 'month');

            return (
              <Pressable
                key={index}
                onPress={() => handleDayPress(day)}
                style={[
                  styles.dayItem,
                  isSelected && styles.selectedDayItem,
                  !isCurrentMonth && styles.nonCurrentMonthDay,
                ]}
              >
                <Body2 style={[styles.weekdayText, isSelected && styles.selectedDayText]}>
                  {day.format('ddd')}
                </Body2>
                <Body1 style={[styles.dayText, isSelected && styles.selectedDayText]}>
                  {day.format('D')}
                </Body1>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.timeSection}>
        <Heading2 style={styles.timeHeader}>{t('selectTime')}</Heading2>
        <ScrollView showsVerticalScrollIndicator={false} decelerationRate="fast">
          {timeSlots.map((time, index) => (
            <Pressable
              key={index}
              onPress={() => handleTimePress(time)}
              style={[
                styles.timeItem,
                time === selectedTime && styles.selectedTimeItem,
              ]}
            >
              <Other
                style={[
                  styles.timeText,
                  time === selectedTime && styles.selectedTimeText,
                ]}
              >
                {time}
              </Other>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        date={selectedDate.toDate()}
      />
    </View>
  );
};

export default OnClickSchedule;

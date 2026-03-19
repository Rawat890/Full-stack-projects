import { Other } from 'components/TextComponents';
import React, { useState } from 'react';
import { ScrollView, Pressable, View } from 'react-native';

import dates from '../../../../../utilities/constants/dates';
import {
  convertToDateOnly,
  formatDate,
  getDaysInMonth,
  isPastDate,
} from '../../../../../utilities/helper/dateFunctions';

import { styles } from './styles';

const PickDateHorizontally = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const today = new Date();

  const navigateMonth = (direction) => {
    if (direction === 'prev' && (currentMonth > today.getMonth() || currentYear > today.getFullYear())) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const isSelected = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return convertToDateOnly(selectedDate) === convertToDateOnly(date);
  };

  const isDisabled = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return isPastDate(date) && !isSelected(day);
  };

  return (
    <View style={styles.datePickerContainer}>
      <View style={styles.monthHeader}>
        <Pressable
          onPress={() => navigateMonth('prev')}
          style={styles.monthNavButton}
        >
          <Other style={styles.monthNavText}>{'<'}</Other>
        </Pressable>

        <Other
          style={styles.monthTitle}
        >{`${formatDate(new Date(currentYear, currentMonth, 1), dates.MMMM_yyyy)}`}</Other>

        <Pressable
          onPress={() => navigateMonth('next')}
          style={styles.monthNavButton}
        >
          <Other style={styles.monthNavText}>{'>'}</Other>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateScrollView}
      >
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const date = new Date(currentYear, currentMonth, day);
          return (
            <Pressable
              key={day}
              style={[
                styles.dateItem,
                isSelected(day) && styles.selectedDateItem,
                isDisabled(day) && styles.disabledDateItem,
              ]}
              onPress={() => !isDisabled(day) && onDateChange(date)}
              disabled={isDisabled(day)}
            >
              <Other
                style={[
                  styles.dateText,
                  isSelected(day) && styles.selectedDateText,
                  isDisabled(day) && styles.disabledDateText,
                ]}
              >{formatDate(date, dates.DAY_NAME)}</Other>

              <Other
                style={[
                  styles.dayText,
                  isSelected(day) && styles.selectedDayText,
                  isDisabled(day) && styles.disabledDayText,
                ]}
              >{day}</Other>

            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PickDateHorizontally;

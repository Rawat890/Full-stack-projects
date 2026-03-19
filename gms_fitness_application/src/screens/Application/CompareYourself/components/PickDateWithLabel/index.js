import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import { Other } from '../../../../../components/TextComponents';
import dates from '../../../../../utilities/constants/dates';

import { styles } from './styles';

const PickDateWithLabel = ({ label, date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.pickerGroup}>
      <Other style={styles.label}>{label}</Other>
      <Pressable style={styles.dateButton} onPress={() => setShow(true)}>
        <Other style={styles.dateText}>{dayjs(date).format(dates.DD_MMMM_YYYY)}</Other>
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default PickDateWithLabel;

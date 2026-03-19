import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, TextInput, ImageBackground } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { colors } from '../../../../../utilities/constants/colors';

import { styles } from './styles';

const PickDate = ({ source, value, onChange }) => {
  const { t } = useTranslation();
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  function openDate() {
    setDatePickerOpen(true);
  }

  const formattedDate = value ? new Date(value).toLocaleDateString() : '';

  return (
    <>
      <Pressable onPress={openDate} style={styles.imageButton}>
        <ImageBackground source={source} style={styles.icon} />
        <TextInput
          placeholder={t('birthDate')}
          style={styles.input}
          placeholderTextColor={colors.gray1}
          value={formattedDate}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>
      <DatePicker
        modal
        mode="date"
        open={datePickerOpen}
        date={value ? new Date(value) : new Date()}
        maximumDate={new Date()}
        onConfirm={(date) => {
          setDatePickerOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />
    </>
  );
};

export default PickDate;

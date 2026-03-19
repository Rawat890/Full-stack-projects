import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, ImageSourcePropType } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { ErrorText } from '../../../../../components/TextComponents';
import { styles } from './styles';

type Gender = 'Male' | 'Female' | 'Other';

interface PickGenderProps {
  value?: Gender;
  onChange: (value: Gender) => void;
  error?: string;
  icon?: ImageSourcePropType;
}

const PickGender: React.FC<PickGenderProps> = ({
  value = 'Male',
  onChange,
  error,
  icon,
}) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const genderItems = useMemo(
    () => [
      { label: 'Male', value: 'Male' as Gender },
      { label: 'Female', value: 'Female' as Gender },
      { label: 'Other', value: 'Other' as Gender },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {icon && <Image source={icon} style={styles.icon} />}

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            open={open}
            value={value}
            items={genderItems}
            setOpen={setOpen}
            setValue={(callback) => {
              const newValue = callback(value);
              if (newValue) {
                onChange(newValue as Gender);
              }
            }}
            setItems={() => {}}
            placeholder={t('chooseGender')}
            textStyle={styles.textStyle}
            style={styles.picker}
            dropDownContainerStyle={styles.dropDown}
          />
        </View>
      </View>

      {error && (
        <ErrorText style={styles.errorText}>
          {error}
        </ErrorText>
      )}
    </View>
  );
};

export default PickGender;
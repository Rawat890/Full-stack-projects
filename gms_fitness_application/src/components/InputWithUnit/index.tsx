import React from 'react';
import {
  View,
  Image,
  TextInput,
  ImageSourcePropType,
  TextInputProps,
} from 'react-native';

import {colors} from '../../utilities/constants/colors';
import PressableImage from '../PressableImage';

import {styles} from './styles';
import { upperBody } from '../../utilities/constants/images';

interface InputWithUnitProps {
  source?: ImageSourcePropType;
  placeholder?: string;
  unit?: ImageSourcePropType;
  value?: string;
  onChangeText?: (value: number) => void;
  keyboard?: TextInputProps['keyboardType'];
}

const InputWithUnit: React.FC<InputWithUnitProps> = ({
  source,
  placeholder,
  unit,
  value,
  onChangeText,
  keyboard,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={source} style={styles.icon} />
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor={colors.gray1}
          value={value}
          onChangeText={text => {
            const numericValue = parseFloat(text);
            if (!isNaN(numericValue) && onChangeText) {
              onChangeText(numericValue);
            }
          }}
          keyboardType={keyboard}
        />
      </View>
      <PressableImage
        source={unit ?? upperBody}
        imageStyle={styles.unit}
        pressableStyle={styles.pressed}
      />
    </View>
  );
};

export default InputWithUnit;

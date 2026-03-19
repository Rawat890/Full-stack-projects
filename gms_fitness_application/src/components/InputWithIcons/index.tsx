import React, { forwardRef } from 'react';
import {
  View,
  Image,
  TextInput,
  TextInputProps,
  ImageSourcePropType,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
} from 'react-native';

import { colors } from '../../utilities/constants/colors';
import PressableImage from '../PressableImage';

import { styles } from './styles';

type InputWithIconsProps = {
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onIconPress?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  onChangeText?: (text: string) => void;
  value?: string;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  returnKeyType?: TextInputProps['returnKeyType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: boolean;
};

const InputWithIcons = forwardRef<TextInput, InputWithIconsProps>(
  (
    {
      leftIcon,
      placeholder,
      rightIcon,
      onIconPress,
      secureTextEntry,
      keyboardType,
      onChangeText,
      value,
      onSubmitEditing,
      returnKeyType,
      autoCapitalize,
      autoCorrect,
    },
    ref,
  ) => {
    return (
      <View style={styles.container}>
        {leftIcon && <Image source={leftIcon} style={styles.icon1 || styles.icon} />}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.gray1}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          style={styles.input}
        />
        {rightIcon && (
          <PressableImage
            source={rightIcon}
            onPress={onIconPress}
            imageStyle={styles.icon2}
            pressableStyle={styles.iconPressable}
          />
        )}
      </View>
    );
  },
);

export default InputWithIcons;

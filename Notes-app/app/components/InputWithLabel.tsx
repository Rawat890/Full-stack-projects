import React from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import COLORS from '../utils/colors';

interface InputWithLabelProps {
  label: string;
  value: string;
  placeholder?: string;

  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;

  onLeftIconPress?: () => void;
  onChangeText: (text: string) => void;

  labelStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;

  errorText?: string;
}

export default function InputWithLabel({
  label,
  value,
  placeholder = "",
  rightIcon,
  leftIcon,
  onLeftIconPress,
  onChangeText,
  labelStyle,
  inputContainerStyle,
  errorText,
}: InputWithLabelProps) {

  return (
    <View style={{ marginBottom: 20 }}>

      <Text style={[{ marginTop: 20, marginBottom: 6 }, labelStyle]}>
        {label}
      </Text>

      <View
        style={[
          {
            borderWidth: 1,
            borderColor: errorText ? 'red' : '#ccc',
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'flex-start',
          },
          inputContainerStyle,
        ]}
      >

        {leftIcon && (
          <TouchableOpacity onPress={onLeftIconPress}>
            {leftIcon}
          </TouchableOpacity>
        )}

        <View style={{ flex: 1 }}>
          <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={{
              textAlignVertical: 'top',
              padding: 0,
              fontSize: 16,
              color: COLORS.white
            }}
          />
        </View>

        {rightIcon && rightIcon}

      </View>

      {errorText && (
        <Text style={{ color: 'red', marginTop: 4 }}>
          {errorText}
        </Text>
      )}
    </View>
  );
}
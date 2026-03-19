import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  View,
  Image,
  Pressable,
  ImageSourcePropType,
  GestureResponderEvent,
} from 'react-native';
import { scale } from 'react-native-size-matters';

import { Other } from '../TextComponents';
import { styles } from './styles';

interface PickOptionProps {
  source1?: ImageSourcePropType;
  source2?: ImageSourcePropType;
  label?: string;
  onValueChange: (value: string) => void;
  selectedValue?: string;
  options: string[];
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

const PickOption: React.FC<PickOptionProps> = ({
  source1,
  source2,
  label,
  onValueChange,
  selectedValue,
  options,
  isOpen,
  onToggle,
}) => {
  const { t } = useTranslation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: isOpen ? options.length * scale(40) : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isOpen, options.length]);

  const handleSelect = (value: string) => {
    onValueChange(value);
    onToggle(false);
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.dropdownContainer}>
      <Pressable
        onPress={() => onToggle(!isOpen)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.btnInnerContainer}>
            {source1 && <Image source={source1} style={styles.image} />}
            <Other style={styles.pickerLabel}>{label}</Other>
          </View>
          <View style={styles.picker}>
            <Other style={styles.pickedValue}>{selectedValue || t('select')}</Other>
            {source2 && (
              <Image
                source={source2}
                style={[
                  styles.image,
                  { transform: [{ rotate: isOpen ? '90deg' : '0deg' }] },
                ]}
              />
            )}
          </View>
        </Animated.View>
      </Pressable>

      <Animated.View
        style={[
          styles.dropdownList,
          {
            height: heightAnim,
            opacity: opacityAnim,
          },
        ]}
      >
        {options.map((option) => (
          <Pressable
            key={option}
            onPress={() => handleSelect(option)}
            style={styles.dropdownItem}
          >
            <Other style={styles.dropdownItemText}>{option}</Other>
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
};

export default PickOption;

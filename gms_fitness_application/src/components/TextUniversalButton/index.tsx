import React, { useRef } from 'react';
import { Animated, Pressable, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../utilities/constants/colors';
import { Other } from '../TextComponents';

import { styles } from './styles';

type TextUniversalButtonProps = {
  label?: string;
  onPress?: () => void;
  compact?: boolean;
  color?: 'white' | 'gradient';
  textColor?: string | null;
};

const TextUniversalButton: React.FC<TextUniversalButtonProps> = ({
  label,
  onPress,
  compact = false,
  color = 'gradient',
  textColor,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const isWhite = color === 'white';
  const Wrapper = isWhite ? View : LinearGradient;

  const baseStyle: ViewStyle[] = [
    styles.baseButton,
    compact ? styles.compactButton : styles.textButton,
  ];

  const wrapperProps = isWhite
    ? { style: [...baseStyle, styles.whiteBackground] }
    : {
        colors: [colors.pink1, colors.violet2],
        style: baseStyle,
      };

  const finalTextColor =
    textColor ?? (isWhite ? colors.orchidPink1 : colors.white1);

  const textStyle = compact ? styles.compactText : styles.textButtonText;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Wrapper {...wrapperProps}>
          <Other style={[textStyle, { color: finalTextColor }]}>
            {label}
          </Other>
        </Wrapper>
      </Animated.View>
    </Pressable>
  );
};

export default TextUniversalButton;

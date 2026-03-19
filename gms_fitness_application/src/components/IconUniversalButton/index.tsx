import React, { useRef } from 'react';
import {
  Pressable,
  Image,
  Animated,
  View,
  ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../utilities/constants/colors';
import { Other } from '../TextComponents';
import { styles } from './styles';

interface IconUniversalButtonProps {
  label?: string;
  onPress?: () => void;
  source?: ImageSourcePropType;
  color?: string;
  useGradient?: boolean;
}

const IconUniversalButton: React.FC<IconUniversalButtonProps> = ({
  source,
  label,
  onPress,
  color,
  useGradient = false,
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

  const content = (
    <>
      <Image source={source} style={label ? styles.iconWithText : styles.iconOnly} />
      {label && <Other style={styles.buttonText}>{label}</Other>}
    </>
  );

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
    >
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
        {useGradient && label ? (
          <LinearGradient colors={[colors.pink1, colors.violet2]} style={styles.gradientButton}>
            {content}
          </LinearGradient>
        ) : (
          <View style={label ? styles.iconTextButton : styles.iconOnlyButton}>
            {content}
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default IconUniversalButton;

import React from 'react';
import {
  Pressable,
  Image,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
  GestureResponderEvent,
  PressableProps,
} from 'react-native';

import {styles} from './styles';

interface PressableImageProps extends PressableProps {
  source: ImageSourcePropType;
  imageStyle?: ImageStyle;
  pressableStyle?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const PressableImage: React.FC<PressableImageProps> = ({
  source,
  imageStyle,
  pressableStyle,
  onPress,
  ...restProps
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.defaultPressable,
        pressableStyle,
        pressed && styles.pressedOpacity,
      ]}
      {...restProps}>
      {source && (
        <Image source={source} style={[styles.defaultImage, imageStyle]} />
      )}
    </Pressable>
  );
};

export default PressableImage;

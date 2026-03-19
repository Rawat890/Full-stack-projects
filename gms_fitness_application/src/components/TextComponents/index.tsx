import React from 'react';
import {
  Text,
  TextProps,
  TextStyle,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';

import { styles } from './styles';

interface TextComponentProps extends TextProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

export const TextComponents: React.FC<TextComponentProps> = ({
  children,
  style,
  onPress,
  ...props
}) => {
  return (
    <Text onPress={onPress} style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  );
};

const createHeading =
  (textStyle: StyleProp<TextStyle>): React.FC<TextComponentProps> =>
  ({ style, ...props }) =>
    <TextComponents {...props} style={[textStyle, style]} />;

export const Heading1 = createHeading(styles.heading1);
export const Heading2 = createHeading(styles.heading2);
export const Heading3 = createHeading(styles.heading3);
export const SubHeading = createHeading(styles.subHeading);
export const Body1 = createHeading(styles.body1);
export const Body2 = createHeading(styles.body2);
export const Body3 = createHeading(styles.body3);
export const Other = createHeading(styles.other);
export const ErrorText = createHeading(styles.errorText);

import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  defaultPressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultImage: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  pressedOpacity: {
    opacity: 0.7,
  },
});

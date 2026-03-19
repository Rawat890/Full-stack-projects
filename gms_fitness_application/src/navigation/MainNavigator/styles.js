import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  iconStyle: {
    width: scale(28),
    height: scale(28),
    marginTop: scale(6),
    resizeMode: 'contain',
  },
});

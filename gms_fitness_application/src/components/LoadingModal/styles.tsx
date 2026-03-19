import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black2,
  },
  modalContent: {
    backgroundColor: colors.white1,
    padding: scale(20),
    borderRadius: scale(10),
  },
});

import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  button: {
    padding: scale(10),
    backgroundColor: colors.red1,
    borderRadius: scale(5),
    margin: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white1,
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(14),
  },
});

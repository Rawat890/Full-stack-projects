import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(20),
    paddingHorizontal: scale(25),
    borderRadius: scale(10),
    backgroundColor: colors.white1,
  },
  text1: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(14),
    color: colors.orchidPink1,
  },
  text2: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(12),
    color: colors.gray4,
  },
});

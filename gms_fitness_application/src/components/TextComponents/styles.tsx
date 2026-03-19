import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';
import fontFamily from '../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  defaultText: {
    color: colors.black1,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(14),
  },
  heading1: {
    fontSize: scale(32),
    fontFamily: fontFamily.PoppinsBold,
    color: colors.black1,
  },
  heading2: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(24),
    color: colors.black1,
  },
  heading3: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(20),
    color: colors.black1,
  },
  subHeading: {
    fontFamily: fontFamily.PoppinsLight,
    fontSize: scale(18),
    color: colors.gray1,
  },
  body1: {
    fontSize: scale(16),
    color: colors.black1,
  },
  body2: {
    fontSize: scale(14),
    color: colors.gray1,
  },
  body3: {
    fontSize: scale(12),
    color: colors.gray1,
  },
  other: {
    fontSize: scale(12),
    color: colors.gray1,
  },
  errorText: {
    fontSize: scale(14),
    color: colors.gray1,
  },
});

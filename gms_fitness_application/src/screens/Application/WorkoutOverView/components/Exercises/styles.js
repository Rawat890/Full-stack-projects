import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  circleButton: {
    width: scale(32),
    height: scale(32),
  },
  exerciseCard: {
    backgroundColor: colors.white1,
    flexDirection: 'row',
    marginVertical: scale(3),
    padding: scale(8),
    borderRadius: scale(10),
    alignItems: 'center',
  },
  exerciseImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(8),
  },
  exerciseText: {
    flex: 1,
    marginLeft: scale(10),
  },
  exerciseTitle: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
  },
  exerciseDesc: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  exerciseTime: {
    fontSize: scale(11),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  pressed: {
    opacity: 0.7,
  },
});

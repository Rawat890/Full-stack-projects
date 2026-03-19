import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(15),
    paddingHorizontal: scale(10),
    backgroundColor: colors.white1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(20),
  },
  text: {
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
    fontSize: scale(14),
  },
  icon1: {
    height: scale(22),
    width: scale(22),
  },
  icon2: {
    height: scale(15),
    width: scale(15),
  },
  pressed: {
    opacity: 0.7,
  },
  detailBox: {
    marginHorizontal: scale(50),
    marginTop: scale(-10),
  },
  detailText: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
    color: colors.gray3,
    marginVertical: scale(2),
    marginHorizontal: scale(2),
  },
});

import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../../../utilities/helper/getDimensions';

const [screenWidth] = getDimensions();

export const styles = StyleSheet.create({
  sleepContainer: {
    width: scale(screenWidth / 1.24),
    backgroundColor: colors.pink2,
    paddingVertical: scale(20),
    borderRadius: scale(20),
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: scale(10),
    marginBottom: scale(7),
  },
  sleep1: {
    flexDirection: 'row',
  },
  sleepInnerContainer1: {
    width: scale(200),
    marginTop: scale(5),
    marginHorizontal: scale(10),
  },
  sleepText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(16),
    color: colors.black1,
    marginHorizontal: scale(10),
  },
  sleepSecondaryText: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
    color: colors.orchidPink1,
    marginHorizontal: scale(10),
  },
  smallBtn: {
    width: '66%',
    marginBottom: scale(-5),
  },
  sleepIcon: {
    width: scale(100),
    height: scale(100),
    right: scale(20),
  },
  learnMore: {
    fontSize: scale(12),
    marginTop: scale(10),
    marginHorizontal: scale(20),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.orchidPink1,
  },
});

import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../../../utilities/helper/getDimensions';

const [screenWidth] = getDimensions();

export const styles = StyleSheet.create({
  activityContainer: {
    marginVertical: scale(10),
    backgroundColor: colors.pink2,
    padding: scale(15),
    borderRadius: scale(20),
    flexDirection: 'row',
  },
  activityInnerContainer1: {
    width: scale(200),
  },
  activityMainText: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(14),
    color: colors.black1,
  },
  activitySecondaryText: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
    color: colors.gray4,
  },
  smallBtn: {
  },
  circle: {
    borderRadius: scale(100),
    backgroundColor: colors.white1,
    width: scale(85),
    height: scale(85),
    marginVertical: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    right: scale(20),
    elevation: 3,
  },
  image: {
    width: scale(83),
    height: scale(83),
  },
  checkBtn: {
    width: screenWidth / 3.0,
    padding: scale(10),
    marginHorizontal: scale(5),
    marginVertical: scale(10),
    paddingHorizontal: scale(20),
    paddingVertical: scale(5),
    borderRadius: scale(50),
    backgroundColor: colors.white1,
  },
  checkText: {
    color: colors.orchidPink1,
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(14),
    marginTop: scale(3),
  },
  pressed: {
    opacity: 0.7,
  },
});

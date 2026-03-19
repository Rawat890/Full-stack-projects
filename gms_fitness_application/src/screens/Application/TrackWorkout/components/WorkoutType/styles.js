import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../../../utilities/helper/getDimensions';

const [screenWidth] = getDimensions();
export const styles = StyleSheet.create({
  activityContainer: {
    marginVertical: scale(5),
    backgroundColor: colors.pink2,
    borderRadius: scale(20),
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    marginHorizontal: scale(20),
  },
  activityInnerContainer1: {
    width: screenWidth / 1.5,
  },
  activityMainText: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(16),
    color: colors.black1,
  },
  activitySecondaryText: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(13),
    color: colors.gray4,
  },
  isLoading: {
    textAlign: 'center',
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsMedium,
    marginVertical: scale(10),
  },
  smallBtn: {
    width: screenWidth / 2.7,
  },
  circle: {
    borderRadius: scale(100),
    backgroundColor: colors.white1,
    width: screenWidth / 4,
    height: screenWidth / 4,
    justifyContent: 'center',
    alignItems: 'center',
    right: scale(45),
    marginTop: scale(10),
    elevation: 2,
  },
  image: {
    width: scale(90),
    height: scale(87),
  },
});

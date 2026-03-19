import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../utilities/helper/getDimensions';

const [screenWidth, screenHeight] = getDimensions();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  frame1: {
    width: screenWidth / 1,
    height: screenHeight / 1.7,
    alignItems: 'flex-end',
  },
  textContainer: {
    marginHorizontal: scale(24),
    marginTop: scale(30),
  },
  skip: {
    marginHorizontal: scale(15),
    marginTop: scale(screenHeight / 55),
    borderWidth: scale(2),
    borderColor: colors.white1,
    borderRadius: scale(20),
    paddingHorizontal: scale(10),
  },
  skipText: {
    color: colors.white1,
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(14),
  },
  primaryText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(24),
  },
  secondaryText: {
    fontFamily: fontFamily.PoppinsLight,
    color: colors.gray3,
    fontSize: scale(14),
    lineHeight: scale(18),
  },
  buttonImage: {
    width: scale(62),
    height: scale(62),
  },
  button: {
    marginLeft: Platform.OS === 'android' ? screenWidth / 1.48 : screenWidth / 1.49,
    marginVertical: Platform.OS === 'android' ? screenHeight / 10 : screenHeight / 17,
  },
  pressed: {
    opacity: 0.7,
  },
});

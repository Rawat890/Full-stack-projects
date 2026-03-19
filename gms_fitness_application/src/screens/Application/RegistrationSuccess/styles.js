import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../utilities/helper/getDimensions';

const [screenWidth, screenHeight] = getDimensions();

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white1,
    flex: 1,
  },
  mainView: {
    marginTop: scale(70),
    alignItems: 'center',
  },
  frameView: {
    width: screenWidth / 1.4,
    height: screenHeight / 1.6,
    alignItems: 'center',
    borderRadius: scale(20),
    marginTop: scale(20),
  },
  frame1: {
    width: scale(290),
    height: scale(330),
    marginTop: scale(20),
  },
  imagePrimaryTextContainer: {
    alignItems: 'center',
  },
  imagePrimaryText: {
    color: colors.black1,
    fontSize: scale(20),
    marginTop: scale(20),
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsBold,
  },
  imageSecondaryText: {
    color: colors.gray1,
    fontSize: scale(14),
    marginTop: scale(2),
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsLight,
  },
  arrowIcon: {
    color: colors.white1,
    width: scale(30),
    height: scale(30),
  },
  button: {
    marginTop: Platform.OS === 'android' ? screenHeight / 7 : screenHeight / 14,
  },
  pressed: {
    opacity: 0.7,
  },
});

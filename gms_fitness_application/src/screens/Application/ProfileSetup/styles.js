import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../utilities/helper/getDimensions';

const [screenWidth, screenHeight] = getDimensions();

export const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  scroll: { flexGrow: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  frame1: {
    width: screenWidth / 1,
    height: screenHeight / 2.4,
    marginTop:Platform.OS === 'android' ? scale(-30) : scale(-50),
  },
  textContainer: {
    marginHorizontal: scale(30),
    marginTop: scale(10),
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: scale(20),
  },
  primaryText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(20),
  },
  secondaryText: {
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray1,
    fontSize: scale(13),
  },
  errorText: {
    fontFamily: fontFamily.PoppinsLight,
    fontSize: scale(11),
    color: colors.red2,
    marginHorizontal: scale(19),
  },
  button: {
    width: screenWidth / 1.18,
    marginTop: scale(30),
    marginBottom: scale(10),
    marginHorizontal: scale(25),
    padding: scale(13),
    borderRadius: scale(50),
    backgroundColor: colors.orchid1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.white1,
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
  },
  arrowIcon: {
    width: scale(30),
    height: scale(30),
    marginLeft: scale(4),
  },
  pressed: {
    opacity: 0.7,
  },
});

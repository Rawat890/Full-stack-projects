import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  scroll: {
    borderRadius: scale(30),
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white1,
  },
  headerContainer: {
    marginTop: scale(40),
    alignItems: 'center',
  },
  headerPrimaryText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(36),
    color: colors.indigo1,
    textAlign: 'center',
  },
  headerSecondaryText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(36),
    color: colors.black1,
    textAlign: 'center',
  },
  additionalText: {
    fontFamily: fontFamily.PoppinsLight,
    fontSize: scale(18),
    marginTop: scale(-5),
    color: colors.gray1,
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginVertical: scale(30),
    justifyContent: 'center',
  },
  inputWrapper: {
    marginBottom: scale(10),
    position: 'relative',
  },
  welcomeText: {
    marginVertical: scale(10),
    fontFamily: fontFamily.PoppinsBold,
    textAlign: 'center',
    fontSize: scale(20),
    color: colors.black1,
  },
  errorContainer: {
    height: scale(15),
    justifyContent: 'center',
  },
  errorText: {
    marginTop: scale(2),
    color: colors.red2,
    fontSize: scale(10),
    fontFamily: fontFamily.PoppinsLight,
    marginHorizontal: scale(12),
    includeFontPadding: false,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: colors.gray1,
    fontSize: scale(12),
    textDecorationLine: 'underline',
    fontFamily: fontFamily.PoppinsLight,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  socialLogins: {
    marginTop: scale(-20),
  },
});


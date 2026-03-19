import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  scroll: {
    flex: 1,
    flexGrow: 1,
    marginHorizontal: scale(15),
    borderRadius: scale(30),
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: scale(30),
    marginBottom: scale(10),
  },
  headerPrimaryText: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(16),
  },
  headerSecText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(20),
  },
  inputWrapper: {
    marginBottom: scale(10),
    position: 'relative',
  },
  inputContainer: {
    marginVertical: scale(15),
  },
  errorContainer: {
    position: 'absolute',
    bottom: scale(-15),
  },
  errorText: {
    marginHorizontal: scale(10),
    color: colors.red2,
    fontSize: scale(10),
    fontFamily: fontFamily.PoppinsLight,
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(5),
    marginHorizontal: scale(20),
  },
  privacyTextContainer: {
  },
  privacyText: {
    color: colors.gray4,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(11),
  },
  rectangleBox: {
    flexDirection: 'row',
    gap: scale(5),
  },
  rectangle: {
    width: scale(14),
    height: scale(14),
    borderWidth: scale(1),
    borderColor: colors.gray8,
    marginTop: scale(3),
    backgroundColor: colors.white1,
    borderRadius: scale(2),
  },
  socialLoginContainer: {
    marginTop: scale(30),
  },
  checkedBox: {
    borderColor: colors.gray3,
    backgroundColor: colors.white1,
  },
  checkMark: {
    width: scale(14),
    height: scale(14),
    marginHorizontal: scale(-1),
    marginVertical: scale(-1),
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

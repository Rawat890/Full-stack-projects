import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: colors.orchidPink1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.orchidPink1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  primaryText: {
    fontFamily: fontFamily.PoppinsBold,
    color: colors.white1,
    fontSize: scale(36),
    textAlign: 'center',
  },
  secondaryText: {
    fontFamily: fontFamily.PoppinsBold,
    color: colors.black1,
    fontSize: scale(36),
    textAlign: 'center',
  },
  additionalTextContainer: {
    marginVertical: scale(-10),
  },
  additionalText: {
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.white1,
    fontSize: scale(18),
    textAlign: 'center',
  },
  btnContainer: {
    paddingBottom: scale(20),
    width: '100%',
  },
  pressed: {
    opacity: 0.7,
  },
});

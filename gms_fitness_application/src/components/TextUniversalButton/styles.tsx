import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';
import fontFamily from '../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  baseButton: {
    borderRadius: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    marginHorizontal: scale(20),
    paddingVertical: scale(12),
    backgroundColor: colors.indigo1,
  },
  compactButton: {
    paddingVertical: scale(5),
    paddingHorizontal: scale(20),
    marginHorizontal: scale(5),
    marginVertical: scale(10),
    alignSelf: 'stretch',
  },
  whiteBackground: {
    backgroundColor: colors.white1,
  },
  textButtonText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(16),
    marginTop: scale(5),
    textAlign: 'center',
  },
  compactText: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(14),
    marginTop: scale(3),
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});

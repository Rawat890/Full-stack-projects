import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white1,
    alignItems: 'center',
  },
  input: {
    width: '90%',
  },
  btn: {
    width: '100%',
    marginTop: scale(10),
  },
  headerText: {
    textAlign: 'center',
    marginBottom: scale(10),
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: scale(24),
  },
  errorText: {
    color: colors.red2,
    fontFamily: fontFamily.PoppinsLight,
    fontSize: scale(12),
    marginHorizontal: scale(10),
  },
});

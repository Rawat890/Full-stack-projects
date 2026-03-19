import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(20),
    marginBottom: scale(10),
    zIndex: Platform.OS === 'ios' ? 10 : null,

  },
  innerContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.gray7,
    borderRadius: scale(10),
    padding: scale(5),
  },
  icon: {
    width: scale(30),
    height: scale(30),
  },
  dropdownWrapper: {
    flex: 1,
  },
  picker: {
    borderColor: colors.gray7,
    backgroundColor: colors.gray7,
  },
  dropDown: {
    borderColor: colors.white1,
  },
  errorText: {
    fontFamily: fontFamily.PoppinsLight,
    fontSize: scale(11),
    color: colors.red2,
    marginTop: scale(4),
  },
  textStyle: {
    color: colors.gray1,
    fontSize: scale(14),
  },

});

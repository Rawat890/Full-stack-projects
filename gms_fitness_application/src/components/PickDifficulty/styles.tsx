import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';
import fontFamily from '../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
    marginVertical: scale(10),
    backgroundColor: colors.pink2,
    borderRadius: scale(10),
  },
  image: {
    width: scale(20),
    height: scale(20),
  },
  dropdownTexts: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: scale(10),
  },
  difficultyText: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  dropdownHeader: {
    padding: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: scale(20),
  },
  dropdownHeaderText: {
    fontSize: scale(12),
    color: colors.gray4,
    fontFamily: fontFamily.PoppinsRegular,
  },
  dropdownList: {
    marginTop: scale(4),
    borderWidth: scale(1),
    borderColor: colors.pink2,
    borderRadius: scale(8),
    backgroundColor: colors.white1,
    elevation: 4,
  },
  dropdownItem: {
    padding: scale(10),
  },
  dropdownItemText: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  picker:{},
  pressed: {
    opacity: 0.7,
  },
});

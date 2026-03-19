import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';
import fontFamily from '../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  dropdownContainer: {
    borderRadius: scale(10),
    marginVertical: scale(10),
    zIndex: 1,
  },
  button: {
    padding: scale(5),
    flexDirection: 'row',
    gap: scale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white1,
    borderRadius: scale(10),
  },
  btnInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
  pickerLabel: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  image: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  pickedValue: {
    fontSize: scale(12),
    color: colors.gray4,
    fontFamily: fontFamily.PoppinsRegular,
  },
  dropdownList: {
    marginTop: scale(5),
    backgroundColor: colors.white1,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: scale(10),
  },
  dropdownItemText: {
    fontSize: scale(10),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  pressed: {
    opacity: 0.7,
  },
});


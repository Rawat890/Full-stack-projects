import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  pickerGroup: {
    marginBottom: scale(15),
  },
  label: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsMedium,
    marginBottom: scale(5),
    color: colors.black1,
  },
  dateButton: {
    borderWidth: scale(1),
    borderColor: colors.gray4,
    borderRadius: scale(10),
    padding: scale(10),
  },
  dateText: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.black1,
  },
});

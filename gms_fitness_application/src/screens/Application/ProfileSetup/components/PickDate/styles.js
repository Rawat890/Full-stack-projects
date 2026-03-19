import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  imageButton: {
    padding: scale(10),
    flexDirection: 'row',
    marginHorizontal: scale(18),
    marginTop: scale(0),
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.gray7,
    borderRadius: scale(10),
    marginVertical: scale(5),
  },
  input: {
    flex: 1,
    color: colors.gray1,
    fontFamily: fontFamily.PoppinsRegular,
    borderWidth: scale(1),
    borderColor: colors.gray7,
    marginLeft: scale(5),
    marginTop: scale(5),
    padding: scale(3),
  },
  icon: {
    width: scale(30),
    height: scale(30),
  },
});

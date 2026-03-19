import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';
import fontFamily from '../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(14),
    borderColor: colors.gray7,
    borderWidth: scale(1),
    paddingHorizontal: scale(10),
    marginHorizontal: scale(6),
    paddingVertical: Platform.OS==='android' ? scale(3): scale(10),
    marginVertical: scale(4),
  },
  icon1: {
    width: scale(20),
    height: scale(20),
    marginRight: scale(10),
  },
  icon: {
    width: scale(18),
    height: scale(18),
    marginLeft: scale(10),
    marginRight: scale(10),
  },
  input: {
    flex: 1,
    marginTop: scale(3),
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
    color: colors.black1,
  },
  icon2: {
    width: scale(20),
    height: scale(20),
  },
  iconPressable: {
    padding: scale(5),
  },
});

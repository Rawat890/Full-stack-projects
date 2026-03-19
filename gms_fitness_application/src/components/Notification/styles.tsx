import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';
import fontFamily from '../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    gap: scale(10),
    padding: scale(8),
    borderRadius: scale(12),
    marginHorizontal: scale(15),
    marginTop: Platform.OS ==='android' ? scale(-20): scale(20),
    elevation: 3,
  },
  emoji: {
    fontSize: scale(20),
  },
  success: {
    backgroundColor: colors.green3,
  },
  error: {
    backgroundColor: colors.red3,
  },
  icon: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(10),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.black1,
  },
  description: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.black1,

  },
});

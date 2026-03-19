import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    backgroundColor: colors.white1,
    borderRadius: scale(10),
    marginBottom: scale(10),
    elevation: 2,
  },
  chartTitle: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
    marginBottom: scale(10),
    textAlign: 'center',
  },
  chart: {
    borderRadius: scale(10),
  },
  noDataContainer: {
    height: scale(220),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
});

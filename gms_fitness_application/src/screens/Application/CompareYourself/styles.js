import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  headerContainer: {
    marginTop: scale(10),
    marginBottom: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: scale(30),
    height: scale(30),
  },
  header: {
    fontSize: scale(20),
    fontFamily: fontFamily.PoppinsBold,
    color: colors.black1,
  },
  pickerContainer: {
    marginBottom: scale(20),
  },
  comparisonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});

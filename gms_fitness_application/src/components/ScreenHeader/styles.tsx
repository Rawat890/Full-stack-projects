import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';
import fontFamily from '../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: scale(30),
    height: scale(30),
  },
  header: {
    fontSize: scale(20),
    fontFamily: fontFamily.PoppinsBold,
    textAlign: 'center',
    color: colors.black1,
  },
});


import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.orchidPink1,
    borderRadius: scale(50),
    padding: scale(10),
    gap: scale(10),
    alignSelf: 'flex-start',
    maxWidth: '90%',
    marginVertical: scale(5),
  },
  text1: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.white1,
    flexShrink: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  completedContainer: {
    backgroundColor: colors.gray4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.gray2,
    opacity: 0.7,
  },
});

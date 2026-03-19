import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  modalContainer: {
    backgroundColor: colors.white1,
    borderRadius: scale(10),
    padding: scale(20),
    marginTop:Platform.OS === 'android' ? 0 : scale(-10),
  },
  calendar: {
    borderColor: colors.red2,
    borderWidth: scale(2),
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: scale(20),
    right: scale(20),
  },
  addImage: {
    width: scale(105),
    height: scale(105),
  },
  calendarDay: {
    backgroundColor: colors.orchidPink1,
  },
  calendarDayText: {
    color: colors.indigo1,
  },
  pressed: {
    opacity: 0.7,
  },
});

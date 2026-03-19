import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  dayText: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(14),
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  disabledDay: {
    opacity: 0.3,
  },
  datePickerContainer: {
    paddingVertical: scale(12),
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingBottom: scale(10),
  },
  monthTitle: {
    fontSize: scale(18),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.black1,
  },
  monthNavButton: {
  },
  monthNavText: {
    fontSize: scale(26),
    color: colors.red1,
  },
  dateScrollView: {
    paddingHorizontal: scale(10),
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    marginHorizontal: scale(4),
  },
  selectedDateItem: {
    backgroundColor: colors.red1,
  },
  disabledDateItem: {
    opacity: 0.5,
  },
  dateText: {
    fontSize: scale(12),
    color: colors.indigo1,
    textTransform: 'uppercase',
  },
  selectedDateText: {
    backgroundColor: colors.red1,
  },
  disabledDateText: {
    color: colors.gray1,
  },
  selectedDayText: {
    color: colors.blue1,
  },
  disabledDayText: {
    color: colors.gray3,
  },
});

import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(70),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(40),
    marginVertical: scale(20),
    marginHorizontal: scale(20),
  },
  image: {
    width: scale(40),
    height: scale(40),
  },
  header: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(20),
  },
  dateSection: {
    paddingBottom: scale(10),
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  monthTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  monthText: {
    fontSize: scale(18),
    color: colors.gray4,
    fontFamily: fontFamily.PoppinsRegular,
  },
  daysContainer: {
    marginHorizontal: scale(20),
  },
  dayItem: {
    width: scale(50),
    height: scale(70),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(5),
    borderRadius: scale(10),
    backgroundColor: colors.gray4,
  },
  selectedDayItem: {
    backgroundColor: colors.orchidPink1,
  },
  nonCurrentMonthDay: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: scale(18),
    color: colors.gray2,
  },
  weekdayText: {
    fontSize: scale(12),
    color: colors.gray2,
    marginBottom: 5,
  },
  selectedDayText: {
    color: colors.white1,
  },
  timeHeader: {
    fontSize: scale(18),
    fontFamily: fontFamily.PoppinsMedium,
    padding: scale(10),
    marginHorizontal: scale(20),
  },
  timeContainer: {
    flex: 1,
  },
  timeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
    padding: scale(10),
  },
  selectedTimeItem: {
    backgroundColor: colors.white1,
    borderLeftWidth: 3,
  },
  timeText: {
    color: colors.gray4,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(16),
  },
  selectedTimeText: {
    color: colors.gray4,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(16),
  },
});


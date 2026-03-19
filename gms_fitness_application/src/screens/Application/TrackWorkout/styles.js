import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.white1,
  },
  header: {
    marginHorizontal: scale(15),
    marginTop: scale(10),
  },
  upcomingScrollContainer: {
    height: scale(80),
  },
  upcomingScrollContent: {
    paddingBottom: scale(10),
  },
  load: {
    textAlign: 'center',
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
  },
  dailySchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.pink2,
    marginHorizontal: scale(20),
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(20),
  },
  dailyText: {
    fontSize: scale(14),
    color: colors.black1,
    fontFamily: fontFamily.PoppinsMedium,
  },
  upcomingSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(20),
    padding: scale(10),
    borderRadius: scale(20),
  },
  upcomingText1: {
    fontSize: scale(14),
    color: colors.black1,
    fontFamily: fontFamily.PoppinsMedium,
  },
  seeMoreText: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  training: {
    backgroundColor: colors.white1,
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  trainText: {
    marginTop: scale(10),
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
    marginHorizontal: scale(22),
  },
  noWorkout: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsMedium,
    textAlign: 'center',
    color: colors.indigo1,
  },
});

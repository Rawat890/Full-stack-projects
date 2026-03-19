import { Dimensions, Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: colors.white1,
    marginHorizontal: scale(20),
  },
  header: {
    marginTop: scale(10),
  },
  timeRow1: {
    flexDirection: 'row',
    gap: scale(10),
    alignItems: 'center',
  },
  timeRow2: {
    flexDirection: 'row',
    gap: scale(10),
    alignItems: 'center',
  },
  timeLabel: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(14),
  },
  timeValue: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
    color: colors.gray4,
  },
  durationText: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(14),
    color: colors.gray4,
  },
  linearGradient: {
    height: screenWidth / 2.8,
    borderRadius: scale(15),
    justifyContent: 'center',
    padding: scale(10),
  },
  buttonText: {
    fontSize: scale(18),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.white1,
    textAlign: 'center',
  },
  scheduleButton: {
    marginVertical: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.pink2,
    borderRadius: scale(20),
    padding: scale(10),
  },
  scheduleText: {
    fontSize: scale(14),
    marginHorizontal: scale(10),
    fontFamily: fontFamily.PoppinsRegular,
  },
  button: {

  },
  sectionTitle: {
    fontSize: scale(14),
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsMedium,
  },
  loading: {
    textAlign: 'center',
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsMedium,
    marginVertical: scale(10),
  },
  noSleepRecord: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.gray4,
    textAlign: 'center',
  },
  addScheduleBtn: {
    marginVertical:Platform.OS === 'android' ? scale(25) : scale(10),
  },
});

import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  scheduleText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(16),
    color: colors.black1,
    marginHorizontal: scale(20),
    marginVertical: scale(10),
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white1,
    elevation: 1,
    paddingVertical: scale(10),
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    marginHorizontal: scale(10),
  },
  recordItemContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(20),
    marginHorizontal: scale(10),
  },
  bedIcon: {
    width: scale(40),
    height: scale(40),
  },
  timeRow1: {
    flexDirection: 'row',
    gap: scale(10),
  },
  timeLabel1: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(14),
  },
  timeValue1: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
    color: colors.gray4,
  },
  durationText: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.black1,
    marginVertical: scale(10),
    marginHorizontal: scale(10),
  },
  progressContainer: {
    backgroundColor: colors.pink2,
    borderRadius: scale(20),
    marginHorizontal: scale(20),
    padding: scale(10),
    marginVertical: scale(20),
  },
  progressBackground: {
    height: scale(20),
    backgroundColor: colors.white1,
    borderRadius: scale(5),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.orchidPink1,
    borderRadius: scale(5),
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray3,
  },
  progressInfo: {
    marginTop: scale(10),
    alignItems: 'center',
  },
  timeLeftText: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.purple1,
  },
  completionText: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.black1,
    textAlign: 'center',
  },
  doneText: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
    marginTop: scale(5),
    color: colors.orchidPink1,
  },
  threeDots: {
    width: scale(20),
    height: scale(20),
  },
});

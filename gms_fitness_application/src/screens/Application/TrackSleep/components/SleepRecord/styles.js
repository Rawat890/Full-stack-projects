import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white1,
    elevation: 1,
    padding: scale(20),
    borderRadius: scale(10),
    marginBottom: scale(5),
    marginHorizontal: scale(20),
  },
  recordItemContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(20),
  },
  bedIcon: {
    width: scale(25),
    height: scale(25),
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
  icon: {
    width: scale(20),
    height: scale(20),
  },
});

import { Dimensions, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  workoutName: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
  },
  workoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  workoutInfoText: {
    fontSize: scale(12),
    color: colors.gray4,
    fontFamily: fontFamily.PoppinsRegular,
  },
  difficultyPicker: {
    marginBottom: scale(10),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(5),
  },
  itemText1: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsSemiBold,
  },
  itemText2: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(10),
    backgroundColor: colors.cream1,
    padding: scale(7),
    borderRadius: scale(10),
  },
  calenderImage: {
    width: scale(25),
    height: scale(25),
  },
  calenderText: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
    color: colors.gray4,
    marginTop: scale(5),
  },
  scheduleInnerContainer: {
    flexDirection: 'row',
    gap: scale(8),
  },
  date: {
    color: colors.gray3,
    fontSize: scale(10),
    fontFamily: fontFamily.PoppinsMedium,
    marginHorizontal: scale(10),
    marginTop: scale(3),
  },
  equipmentScroll: {
    flexDirection: 'row',
  },
  equipmentContainer: {
    padding: scale(5),
    marginBottom: scale(10),
  },
  equipmentImage: {
    width: scale(70),
    height: scale(70),
    marginRight: scale(10),
    borderRadius: scale(8),
  },
  equipmentText: {
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
  },
  exerciseListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(5),
  },
  exerciseListText: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
  },
  setNumber: {
    fontSize: scale(12),
    color: colors.gray4,
  },
  exerciseScroll: {
    maxHeight: height / 1.7,
  },
});

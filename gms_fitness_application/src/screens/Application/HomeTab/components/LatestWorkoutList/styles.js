import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: scale(10),
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white1,
    padding: scale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(5),
    marginVertical: scale(5),
    borderRadius: scale(10),
  },
  container: {
    flexDirection: 'row',
    gap: scale(15),
  },
  textContainer: {
  },
  textInnerContainer1: {
    flexDirection: 'row',
    gap: 5,
  },
  textInnerContainer2: {
    flexDirection: 'row',
    gap: 5,
  },
  image: {
    width: scale(50),
    height: scale(50),
    marginTop: scale(5),
  },
  buttonImage: {
    marginVertical: scale(10),
    marginHorizontal: scale(10),
    width: scale(25),
    height: scale(25),
  },
  workoutType: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsMedium,
    marginBottom: scale(1),
  },
  detailsText: {
    fontSize: scale(10),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray1,
  },
  date: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(10),
    color: colors.gray3,
  },
  bar:
  {
    height: scale(8),
    width: scale(170),
  },
  time: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(10),
    color: colors.gray3,
  },
  pressed: {
    opacity: 0.7,
  },
});

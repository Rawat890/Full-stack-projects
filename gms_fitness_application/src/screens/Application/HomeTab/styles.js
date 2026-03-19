import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  homeTabOuterContainer: {
    backgroundColor: colors.white1,
    flex: 1,
  },
  homeTabInnerContainer: {
    flex: 1,
    marginHorizontal: scale(8),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
  },
  headerWelcomeText: {
    color: colors.gray1,
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsMedium,
    lineHeight: scale(18),
  },
  userName: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(20),
  },
  bmiContainer: {
    backgroundColor: colors.orchidPink1,
    padding: scale(15),
    borderRadius: scale(20),
    flexDirection: 'row',
    marginHorizontal: scale(10),
    marginBottom: scale(7),
    marginTop: scale(-10),
  },
  bmiInnerContainer1: {
    width: scale(200),
    marginTop: scale(5),
  },
  bmiText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(16),
    color: colors.white1,
  },
  animation: {
    width: scale(80),
    height: scale(80),
  },
  bmiSecondaryText: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
    color: colors.white1,
  },
  checkBtn: {
    width: scale(100),
    marginHorizontal: scale(5),
  },
  smallBtn: {
    width: scale(130),
    marginTop: Platform.OS === 'android' ? 0 : scale(10),
  },
  circle: {
    borderRadius: scale(100),
    backgroundColor: colors.white1,
    width: scale(90),
    height: scale(90),
    marginVertical: scale(10),
    right: scale(10),
    justifyContent: 'center',
  },
  circleText: {
    fontSize: scale(22),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.orchidPink1,
    textAlign: 'center',
    marginTop: scale(10),
  },
  targetTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.pink2,
    paddingVertical: scale(5),
    paddingHorizontal: scale(10),
    borderRadius: scale(20),
    marginVertical: scale(5),
    marginHorizontal: scale(10),
  },
  targetText: {
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.black1,
    fontSize: scale(14),
  },
  pressed: {
    opacity: 0.7,
  },
  latestWorkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(15),
  },
  latestWorkoutText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(16),
  },
  seeMoreText: {
    color: colors.gray6,
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
  },
  workoutContainer: {
    flex: 1,
    backgroundColor: colors.white1,
    marginTop: scale(5),
  },
  noScheduledText: {
    fontSize: scale(16),
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsMedium,
    marginVertical: scale(5),
  },
  icon: {
    fontSize: scale(56),
    marginTop: scale(10),
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsBold,
  },
});


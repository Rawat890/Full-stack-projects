import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:Platform.OS === 'android' ? scale(15) : scale(5),
    marginBottom: scale(10),
    marginHorizontal: scale(20),
  },
  icon: {
    width: scale(30),
    height: scale(30),
  },
  gifContainer: {
    height: scale(240),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white1,
  },
  detailsContainer: {
    marginVertical: scale(20),
    marginHorizontal: scale(20),
  },
  gif: {
    width: scale(300),
    height: scale(230),
    borderColor: colors.white1,
    borderWidth: scale(1),
    elevation: 2,
  },
  exerciseName: {
    fontSize: scale(20),
    fontFamily: fontFamily.PoppinsSemiBold,
  },
  difficultyContainer: {
    padding: scale(10),
    borderRadius: scale(5),
    marginTop: scale(-5),
  },
  difficultyText: {
    fontSize: scale(12),
    marginLeft: scale(-10),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  description: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  normalText: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsBold,
  },
});

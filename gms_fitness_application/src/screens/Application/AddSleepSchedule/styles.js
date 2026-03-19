import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../utilities/helper/getDimensions';

const [screenWidth, screenHeight] = getDimensions();

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  innerContainer: {
    marginHorizontal: scale(20),
  },
  headerContainer: {
    marginBottom: scale(10),
    marginTop: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: scale(30),
    height: scale(30),
  },
  header: {
    fontSize: scale(20),
    fontFamily: fontFamily.PoppinsBold,
    textAlign: 'center',
    color: colors.black1,
  },
  timeContainer: {
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(20),
  },
  timeSection1: {
    flexDirection: 'row',
    gap: scale(20),
  },
  icon: {
    width: scale(25),
    height: scale(25),
  },
  durationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(20),
    padding: scale(20),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
    color: colors.purple1,
    textAlign: 'center',
  },
  timeButton: {
    borderRadius: scale(10),
  },
  timeText: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsMedium,
    textAlign: 'center',
  },
  durationText: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsMedium,
    textAlign: 'center',
  },
  button: {
    top:Platform.OS==='android'? screenHeight / 1.9 : screenHeight/2.5,
  },
});


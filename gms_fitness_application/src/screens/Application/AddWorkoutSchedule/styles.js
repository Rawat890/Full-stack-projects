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
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContainer: {
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(35),
    marginVertical:Platform.OS === 'android' ? scale(15) : scale(5),
    marginHorizontal: scale(15),
  },
  close: {
    width: scale(30),
    height: scale(30),
  },
  addScheduleText: {
    fontSize: scale(22),
    fontFamily: fontFamily.PoppinsSemiBold,
    textAlign: 'center',
  },
  dateButton: {
    padding: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(10),
    gap: scale(10),
  },
  image: {
    width: scale(30),
    height: scale(30),
  },
  dateText: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  timeContainer: {
  },
  timeText: {
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: scale(18),
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(10),
    gap: scale(10),
    justifyContent: 'center',
  },
  time: {
    fontSize: scale(22),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  detailsContainer: {
    marginVertical: scale(50),
    marginHorizontal: scale(10),
  },
  detailsText: {
    fontSize: scale(18),
    marginHorizontal: scale(10),
    fontFamily: fontFamily.PoppinsMedium,
  },
  button: {
    position: 'absolute',
    top:Platform.OS === 'android' ? screenHeight / 1.13 : scale(600),
    width: '100%',
  },
});


import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../utilities/helper/getDimensions';

const [screenWidth, screenHeight] = getDimensions();

export const styles = StyleSheet.create({
  list: {
    padding: scale(16),
  },
  videoContainer: {
    marginBottom: scale(24),
  },
  innerContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: scale(10),
  },
  video: {
    height: scale(screenHeight / 4.2),
    width: '100%',
  },
  title: {
    fontSize: scale(18),
    color: colors.indigo1,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginHorizontal: scale(5),
    textAlign: 'center',
  },
  duration: {
    fontSize: scale(14),
    color: colors.gray2,
    marginBottom: scale(4),
  },
  description: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsMedium,
  },
  icon: {
    width: scale(30),
    height: scale(30),
  },
});

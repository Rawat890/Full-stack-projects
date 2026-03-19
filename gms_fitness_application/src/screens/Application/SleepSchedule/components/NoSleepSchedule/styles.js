import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../../../utilities/helper/getDimensions';

const [screenHeight] = getDimensions();

export const styles = StyleSheet.create({
  noSchedulesText: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
    textAlign: 'center',
    marginTop: scale(20),
  },
  addBtnContainer: {
    position: 'absolute',
    top: scale(screenHeight) + scale(140),
    right: scale(20),
  },
  addBtn: {
    width: scale(90),
    height: scale(90),
  },
  pressed: {
    opacity: 0.7,
  },
});


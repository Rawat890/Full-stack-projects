import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';
import fontFamily from '../../utilities/constants/fontFamily';
import { getDimensions } from '../../utilities/helper/getDimensions';

const [screenWidth] = getDimensions();

export const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
  },
  iconOnlyButton: {
    borderRadius: scale(50),
    padding: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(12),
    top: scale(15),
  },
  iconTextButton: {
    width: screenWidth / 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(12),
    backgroundColor: colors.purple2,
    borderRadius: scale(50),
    gap: scale(5),
    top: scale(30),
  },
  gradientButton: {
    borderRadius: scale(50),
    width: screenWidth / 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(12),
    gap: scale(5),
    top: scale(30),
  },
  iconOnly: {
    width: scale(50),
    height: scale(50),
  },
  iconWithText: {
    width: scale(25),
    height: scale(25),
  },
  buttonText: {
    color: colors.white1,
    marginTop: scale(3),
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(16),
  },
  pressed: {
    opacity: 0.7,
  },
});

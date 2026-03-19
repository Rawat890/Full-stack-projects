import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';
import fontFamily from '../../utilities/constants/fontFamily';
import { getDimensions } from '../../utilities/helper/getDimensions';

const [screenWidth, screenHeight] = getDimensions();

export const styles = StyleSheet.create({
  loginSectionContainer: {
    marginTop: scale(screenHeight / 55),
    width: '100%',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(50),
  },
  line: {
    flex: 1,
    height: scale(1),
    marginHorizontal: scale(5),
    backgroundColor: colors.gray5,
  },
  orText: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
  },
  loginIconContainer: {
    marginTop: scale(20),
    marginRight: scale(1),
    flexDirection: 'column',
    alignItems: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: scale(10),
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(25),
  },
  footText: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
  },
  loginText: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.purple1,
    marginHorizontal: scale(2),
  },
  pressed: {
    opacity: 0.7,
  },
});

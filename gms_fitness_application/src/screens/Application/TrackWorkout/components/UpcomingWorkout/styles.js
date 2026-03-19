import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: scale(5),
    borderRadius: scale(20),
    marginHorizontal: scale(20),
    backgroundColor: colors.white1,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    width: scale(60),
    height: scale(60),
    marginVertical: scale(5),
    marginHorizontal: scale(10),
    justifyContent: 'center',
    borderRadius: scale(50),
    alignItems: 'center',
    backgroundColor: colors.green1,
  },
  image: {
    width: scale(50),
    height: scale(55),
    marginTop: scale(5),
  },
  icon: {
    width: scale(25),
    height: scale(25),
    marginHorizontal: scale(10),
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.black1,
  },
  text2: {
    fontSize: scale(10),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.gray4,
  },
  pressed: {
    opacity: 0.7,
  },
});

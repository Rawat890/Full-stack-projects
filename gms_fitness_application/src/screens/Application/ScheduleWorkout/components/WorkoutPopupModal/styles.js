import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';


export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.black2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.white1,
    borderRadius: scale(20),
    padding: scale(20),
    width: '80%',
  },
  header: {
    marginVertical: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: scale(22),
    height: scale(22),
  },
  title: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsMedium,
  },
  text: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsMedium,
    marginBottom: scale(5),
    color: colors.black1,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(50),
    padding: scale(10),
    marginTop: scale(20),
  },
  buttonText: {
    color: colors.white1,
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(16),
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
  clock: {
    width: scale(20),
    height: scale(20),
  },
  timeText: {
    fontSize: scale(12),
    color: colors.gray2,
  },
  pressed: {
    opacity: 0.7,
  },
});

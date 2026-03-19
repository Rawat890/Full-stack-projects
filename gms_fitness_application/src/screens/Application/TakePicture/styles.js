import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.orchidPink1,
  },
  container: {
    backgroundColor: colors.white1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(30),
    marginVertical: scale(40),
    padding: scale(8),
    borderRadius: scale(50),
  },
  iconContainer: {
    marginHorizontal: scale(30),
    marginVertical: scale(2),
    alignItems: 'center',
  },
  cameraFrame: {
    width: '100%',
    height: '70%',
    marginVertical: scale(40),
  },
  flash: {
    width: scale(30),
    height: scale(30),
  },
  camera1: {
    width: scale(40),
    height: scale(40),
  },
  camera2: {
    width: scale(30),
    height: scale(30),
  },
});


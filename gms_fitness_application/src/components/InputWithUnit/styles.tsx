import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    padding: scale(8),
    flexDirection: 'row',
    width: scale(266),
    marginVertical: scale(4),
    marginLeft: scale(19),
    alignItems: 'center',
    backgroundColor: colors.gray7,
    borderRadius: scale(10),
  },
  icon: {
    width: scale(25),
    height: scale(25),
  },
  input: {
    flex: 1,
    marginLeft: scale(15),
    paddingVertical: scale(10),
    color: colors.gray1,
  },
  unit: {
    width: scale(45),
    height: scale(45),
    marginVertical: scale(5),
    marginHorizontal: scale(5),
  },
  pressed: {
    opacity: 0.7,
  },
});

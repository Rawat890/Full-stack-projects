import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: scale(20),
    marginHorizontal: scale(24),
  },
  activityText: {
    textAlign: 'center',
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsBold,
  },
});

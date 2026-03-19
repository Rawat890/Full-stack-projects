import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(16),
    backgroundColor: colors.white1,
  },
  header: {
    marginBottom: scale(24),
    textAlign: 'center',
    fontSize: scale(22),
    fontFamily: fontFamily.PoppinsMedium,
  },
  card: {
    backgroundColor: colors.cream1,
    borderRadius: scale(10),
    padding: scale(16),
    marginBottom: scale(12),
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: scale(16),
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: scale(18),
    color: colors.indigo1,
    fontFamily: fontFamily.PoppinsSemiBold,
    marginBottom: scale(4),
  },
  cardDescription: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.black1,
  },
});

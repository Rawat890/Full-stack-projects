import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../utilities/constants/colors';
import fontFamily from '../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(10),
  },
  header: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
    color: colors.black1,
  },
  stepsLength: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(14),
    color: colors.gray4,
  },
  instructionsContainer: {
    marginTop: scale(10),
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: scale(-3),
    alignItems: 'flex-start',
    gap: scale(10),
  },
  stepNumberContainer: {
    width: scale(30),
    alignItems: 'flex-end',
    paddingRight: scale(5),
  },
  stepNumberText: {
    color: colors.orchidPink1,
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
  },
  circleLineContainer: {
    width: scale(20),
    alignItems: 'center',
    marginRight: scale(5),
  },
  noStepsText:{

  },
  circle: {
    borderWidth: scale(2),
    borderColor: colors.orchidPink1,
    backgroundColor: colors.white1,
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(4),
  },
  innerCircle: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: colors.orchidPink1,
  },
  dashedLine: {
    marginVertical: scale(2),
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.black1,
    marginBottom: scale(4),
  },
  stepDescription: {
    fontSize: scale(12),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
    lineHeight: scale(18),
  },
  button: {
    marginTop: scale(20),
  },
});

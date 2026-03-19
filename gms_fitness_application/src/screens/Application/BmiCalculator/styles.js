import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../utilities/helper/getDimensions';

const [screenWidth, screenHeight] = getDimensions();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
  },
  header1: {
    flexDirection: 'row',
    marginTop: scale(5),
    justifyContent: 'space-between',
  },
  header2: {
    flexDirection: 'column',
    marginTop: scale(5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(24),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.indigo1,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.indigo1,
  },
  ageText: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.indigo1,
  },
  age: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(50),
  },
  inputContainer: {
    flex: 1,
    width: '100%',
  },
  input: {
    height: scale(50),
    borderRadius: scale(20),
    fontSize: scale(18),
    color: colors.gray1,
    fontFamily: fontFamily.PoppinsMedium,
    marginVertical: scale(15),
    paddingHorizontal: scale(20),
    backgroundColor: colors.white1,
    borderWidth: scale(1),
    borderColor: colors.white1,
  },
  button: {
    position: 'absolute',
    width: '100%',
    marginTop: scale(screenHeight / 1.8),
    left: scale(screenWidth / 19),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray7,
  },
  modalContent: {
    width: '80%',
    height: '50%',
    padding: scale(20),
    borderRadius: scale(20),
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    width: '100%',
    marginTop: scale(screenHeight / 2.75),
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(10),
    marginVertical: scale(20),
    elevation: 2,
    backgroundColor: colors.white1,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(20),
  },
  cmText: {
    position: 'absolute',
    right: 0,
    top: scale(67),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray1,
    fontSize: scale(12),
  },
  kgText: {
    position: 'absolute',
    right: 0,
    top: scale(145),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray1,
    fontSize: scale(12),
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultText1: {
    color: colors.black1,
    fontSize: scale(20),
    fontFamily: fontFamily.PoppinsMedium,
  },
  resultBox: {
    marginTop: scale(30),
    padding: scale(20),
    borderRadius: scale(10),
    alignItems: 'center',
    width: '90%',
  },
  resultText: {
    fontSize: scale(20),
    textDecorationLine: 'underline',
    marginVertical: scale(20),
    fontFamily: fontFamily.PoppinsMedium,
  },
  bmiInfoText: {
    fontSize: scale(18),
    fontFamily: fontFamily.PoppinsBold,
    color: colors.indigo1,
    marginHorizontal: scale(10),
  },
  categoryText: {
    fontSize: scale(18),
    fontFamily: fontFamily.PoppinsBold,
    color: colors.indigo1,
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.7,
  },
  headerIcon: {
    width: scale(30),
    height: scale(30),
  },
  bmiImage: {
    width: scale(60),
    borderRadius: scale(50),
    height: scale(60),
  },
});

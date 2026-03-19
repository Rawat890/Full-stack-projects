import { StyleSheet } from 'react-native';
import { colors } from '../../utilities/constants/colors';
import { scale } from 'react-native-size-matters';
import { getDimensions } from 'utilities/helper/getDimensions';
import fontFamily from '../../utilities/constants/fontFamily';

const [screenWidth, screenHeight]=getDimensions();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: scale(20),
    backgroundColor: colors.white1,
  },
  row: {
    alignItems: 'center',
    marginVertical: scale(10),
  },
  noWifi: {
    width: scale(screenWidth/2),
    height: scale(screenHeight/5),
  },
  noData: {
    width: scale(screenWidth/1),
    height: scale(screenHeight/3),
  },
  title: {
    fontSize: scale(18),
    marginBottom: scale(5),
    fontFamily:fontFamily.PoppinsBold,
    textAlign: 'center',
  },
  message: {
    fontSize: scale(16),
    marginBottom: scale(5),
    color:colors.gray2,
    fontFamily:fontFamily.PoppinsRegular,
    textAlign: 'center',
  },
});

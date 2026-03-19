import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  container: {
    backgroundColor: colors.white1,
    marginHorizontal: scale(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(20),
    paddingHorizontal: scale(10),
  },
  headerText: {
    fontSize: scale(20),
    fontFamily: fontFamily.PoppinsBold,
    color: colors.black1,
    flex: 1,
    textAlign: 'center',
  },
  dots: {
    width: scale(35),
    height: scale(35),
  },
  profileView: {
    backgroundColor: colors.white1,
    borderRadius: scale(10),
    padding: scale(15),
    elevation: 1,
  },
  image: {
    height: scale(70),
    width: scale(70),
    borderRadius: scale(35),
    backgroundColor: colors.pink2,
  },
  innerView1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(15),
    gap: scale(10),
  },
  user: {
    flex: 1,
  },
  userName: {
    fontFamily: fontFamily.PoppinsSemiBold,
    fontSize: scale(16),
    color: colors.black1,
  },
  userProgram: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
    color: colors.gray4,
    marginTop: scale(2),
  },
  innerView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
  },
  menuSection: {
    backgroundColor: colors.white1,
    borderRadius: scale(10),
    padding: scale(5),
    marginVertical: scale(10),
    elevation: 1,
  },
});


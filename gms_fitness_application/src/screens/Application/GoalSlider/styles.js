import { Dimensions, Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  header: {
    marginVertical:Platform.OS === 'android' ? scale(20) : scale(10),
    alignItems: 'center',
    marginHorizontal: scale(40),
  },
  headerTitle: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(18),
    textAlign: 'center',
    color: colors.black1,
  },
  headerSubtitle: {
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsRegular,
    marginHorizontal: scale(20),
    color: colors.gray1,
    fontSize: scale(13),
  },
  slider: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(20),
  },
  sideDecoration: {
    width: scale(40),
    height: screenHeight / 2,
    backgroundColor: colors.pink2,
    borderRadius: scale(10),
  },
  frameWrapper: {
    width: screenWidth / 1.4,
    height: screenHeight / 1.51,
    backgroundColor: colors.orchid2,
    borderRadius: scale(20),
    overflow: 'hidden',
    alignItems: 'center',
  },
  imageFrame: {
    width: screenWidth / 1.7,
    height: screenHeight / 2.6,
  },
  frameImage: {
    width: '100%',
    height: screenHeight / 2.3,
    marginTop: scale(30),
  },
  textOverlay: {
    alignItems: 'center',
    marginTop: scale(85),
    marginHorizontal: scale(20),
  },
  title: {
    fontFamily: fontFamily.PoppinsBold,
    color: colors.white1,
    fontSize: scale(14),
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.PoppinsLight,
    color: colors.white1,
    fontSize: scale(12),
    textAlign: 'center',
  },
  border: {
    width: scale(80),
    marginVertical: scale(3),
  },
  pagination: {
    position: 'absolute',
    bottom: scale(100),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: colors.gray1,
    marginHorizontal: scale(4),
  },
  paginationDotActive: {
    backgroundColor: colors.indigo1,
    width: scale(12),
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: scale(15),
    left: 0,
    right: 0,
    paddingHorizontal: scale(20),
  },
});

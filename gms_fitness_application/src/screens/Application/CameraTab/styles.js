import { Platform, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../utilities/helper/getDimensions';

const [screenWidth] = getDimensions();

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  container: {
    marginHorizontal: scale(20),
  },
  sheet: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerContainer: {
    marginVertical: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: scale(30),
    height: scale(30),
  },
  image: {
    width:Platform.OS === 'android' ? scale(100) : scale(80),
    height:Platform.OS === 'android' ? scale(100) : scale(80),
    right:Platform.OS === 'android' ? scale(35) : scale(15),
  },
  loading: {
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(16),
    marginVertical: scale(10),
  },
  header: {
    fontSize: scale(20),
    fontFamily: fontFamily.PoppinsBold,
    textAlign: 'center',
    color: colors.black1,
  },
  compareView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.pink2,
    marginVertical: scale(10),
    padding: scale(8),
    borderRadius: scale(20),
  },
  compareText: {
    marginHorizontal: scale(10),
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsMedium,
  },
  photoContainer: {
    backgroundColor: colors.pink2,
    padding: scale(10),
    borderRadius: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(7),
  },
  photoInnerContainer1: {
    marginHorizontal: scale(10),
    width: scale(screenWidth / 1.95),
    marginTop: scale(5),
  },
  photoText: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize:Platform.OS ==='android' ? scale(14) : scale(13.5),
    color: colors.black1,
  },
  photoSecondaryText: {
    fontFamily: fontFamily.PoppinsBold,
    fontSize: scale(12),
    color: colors.orchidPink1,
  },
  smallBtn: {
    width: '66%',
    marginBottom: scale(-5),
  },
  optionButton: {
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.gray1,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(10),
    marginHorizontal: scale(10),
    borderRadius: scale(20),
  },
  galleryText1: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsBold,
  },
  galleryText2: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  item: {
    marginHorizontal: scale(10),
  },
  pressed: {
    opacity: 0.7,
  },
  emptyGallery: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
    marginHorizontal: scale(10),
    marginTop: scale(20),
  },
  emptyText: {
    marginTop: scale(10),
    color: colors.gray4,
    textAlign: 'center',
  },
  dateSection: {
    marginBottom: scale(20),
  },
  dateText: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
    marginBottom: scale(10),
    color: colors.gray4,
    marginHorizontal: scale(10),
  },
  photoList: {
    paddingHorizontal: scale(5),
  },
  photoItem: {
    marginRight: scale(10),
  },
  galleryImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(10),
  },
});

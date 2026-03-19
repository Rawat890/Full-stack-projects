import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { getDimensions } from 'utilities/helper/getDimensions';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

const [screenWidth] = getDimensions();

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  container: {
    marginHorizontal: scale(20),
  },
  headerContainer: {
    marginVertical: scale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: scale(30),
    height: scale(30),
  },
  delIcon: {
    width: scale(20),
    height: scale(20),
  },
  header: {
    fontSize: scale(20),
    fontFamily: fontFamily.PoppinsBold,
    color: colors.black1,
  },
  headerDate: {
    marginVertical: scale(10),
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.gray4,
  },
  listContainer: {
    paddingBottom: scale(20),
  },
  photoContainer: {
    width: scale(screenWidth / 2 - 100),
    margin: scale(2),
    alignItems: 'center',
    marginBottom: scale(10),
    marginHorizontal: scale(10),
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: scale(10),
  },
  deleteButton: {
    position: 'absolute',
    top: scale(5),
    right: scale(5),
    backgroundColor: colors.white1,
    borderRadius: scale(15),
    padding: scale(5),
  },
  sectionHeader: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
    color: colors.black1,
    marginTop: scale(15),
    marginBottom: scale(10),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
});

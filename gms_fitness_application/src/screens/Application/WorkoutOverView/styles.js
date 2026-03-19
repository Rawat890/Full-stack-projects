import { Dimensions, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white1,
  },
  imageBackground: {
    width: '100%',
    height: height / 3,
    backgroundColor: colors.orchidPink1,
  },
  imageStyle: {
    height: scale(300),
    resizeMode: 'contain',
    marginTop: scale(20),
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
    marginTop: scale(10),
  },
  loading: {
    textAlign: 'center',
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsMedium,
    marginVertical: scale(10),
  },
  staticContent: {
    flex: 1,
    padding: scale(20),
    backgroundColor: colors.white1,
    borderTopLeftRadius: scale(35),
    borderTopRightRadius: scale(35),
    marginTop: scale(-34),
  },
  staticContentInner: {
  },
  loadingText: {
    textAlign: 'center',
    marginTop: scale(20),
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
  },
  workoutName: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
    marginHorizontal: scale(1),
  },
  workoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  workoutInfoText: {
    fontSize: scale(12),
    color: colors.gray4,
    fontFamily: fontFamily.PoppinsRegular,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(5),
  },
  itemText1: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsSemiBold,
  },
  itemText2: {
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
    color: colors.gray4,
  },
  equipmentContainer: {
    padding: scale(5),
    marginBottom: scale(10),
  },
  equipmentScroll: {
    flexDirection: 'row',
  },
  equipmentImage: {
    width: scale(70),
    height: scale(70),
    marginRight: scale(10),
    borderRadius: scale(8),
  },
  equipmentText: {
    textAlign: 'center',
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: scale(12),
  },
  exerciseScroll: {
  },
  exerciseContainer: {
    marginBottom: 20,
  },
  exerciseListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(5),
  },
  exerciseListText: {
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsSemiBold,
  },
  setNumber: {
    fontSize: scale(12),
    color: colors.gray4,
  },
  icon: {
    width: scale(30),
    height: scale(30),
  },
  pressed: {
    opacity: 0.7,
  },
});



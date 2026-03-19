import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../utilities/constants/colors';
import fontFamily from '../../../utilities/constants/fontFamily';
import { getDimensions } from '../../../utilities/helper/getDimensions';

const [width, height] = getDimensions();

export const styles = StyleSheet.create({
  modal: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.white1 },
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
  loadingText: {
    textAlign: 'center',
    marginTop: scale(20),
    fontSize: scale(14),
    fontFamily: fontFamily.PoppinsRegular,
  },
  staticContent: {
    flex: 1,
    padding: scale(20),
    backgroundColor: colors.white1,
    borderTopLeftRadius: scale(40),
    borderTopRightRadius: scale(40),
    marginTop: scale(-34),
  },
  staticContentInner: {},
  icon: {
    width: scale(30),
    height: scale(30),
  },
  pressed: {
    opacity: 0.7,
  },
});

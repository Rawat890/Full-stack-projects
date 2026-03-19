import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../../../utilities/constants/colors';
import fontFamily from '../../../../../utilities/constants/fontFamily';

export const styles = StyleSheet.create({
  photoColumn: {
    width: '48%',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: scale(10),
    marginBottom: scale(10),
  },
  placeholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.pink2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    marginBottom: scale(10),
  },
  placeholderText: {
    color: colors.gray4,
    fontSize: scale(16),
    fontFamily: fontFamily.PoppinsRegular,
    textAlign: 'center',
  },
  changePicture: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(50),
  },
  changePictureText: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: scale(14),
    color: colors.white1,
  },
});

import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Body3 } from '../../../../../components/TextComponents';
import { colors } from '../../../../../utilities/constants/colors';

import { styles } from './styles';

const PhotoDisplay = ({ photo, onChange }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.photoColumn}>
      {photo ? (
        <Image source={{ uri: photo.uri }} style={styles.photo} />
      ) : (
        <View style={styles.placeholder}>
          <Body3 style={styles.placeholderText}>{t('noPhotoAvailable')}</Body3>
        </View>
      )}
      <LinearGradient colors={[colors.pink1, colors.violet2]} style={styles.changePicture}>
        <Pressable onPress={onChange}>
          <Body3 style={styles.changePictureText}>{t('changePicture')}</Body3>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default PhotoDisplay;

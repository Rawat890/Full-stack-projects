import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import PressableImage from '../../../components/PressableImage';
import { savePhoto } from '../../../screens/Application/CameraTab/photoSlice';
import { flipCamera, cameraFrame, flash, takePicture } from '../../../utilities/constants/images';
import { OTHERS } from '../../../utilities/constants/others';
import { uploadToCloudinary } from '../../../utilities/storage/cloudinary';

import { styles } from './styles';

const TakePicture = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
  const email = userData.email;
  const takePhoto = async () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: OTHERS.camera_quality,
        saveToPhotos: true,
        flashMode: 'on',
      },
      async (response) => {
        if (response.didCancel) { return; }
        if (response.errorCode) {
          Toast.show({
            type: 'error',
            text1: t('cameraError'),
            text2: '',
          });
          return;
        }

        const localUri = response.assets?.[0]?.uri;

        try {
          const cloudinaryUrl = await uploadToCloudinary(localUri);
          const photoObj = {
            id: Date.now().toString(),
            uri: cloudinaryUrl,
            date: new Date().toISOString(),
          };

          await dispatch(savePhoto({ email, photo: photoObj }));
          Toast.show({
            type: 'success',
            text1: t('memorySavedToGallery'),
            text2: t('makeEveryDayCount'),
          });
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: t('uploadFailed'),
            text2: 'couldNotUploadCloudinary',
          });
        }
      },
    );
  };

  return (
    <View style={styles.mainContainer} >
      <Image
        source={cameraFrame}
        style={styles.cameraFrame}
        resizeMode="contain"
      />

      <View style={styles.container}>
        <PressableImage
          onPress={takePhoto}
          source={flash}
          pressableStyle={styles.iconContainer}
          imageStyle={styles.flash}
        />

        <PressableImage
          onPress={takePhoto}
          source={takePicture}
          pressableStyle={styles.iconContainer}
          imageStyle={styles.camera1}
        />

        <PressableImage
          onPress={takePhoto}
          source={flipCamera}
          pressableStyle={styles.iconContainer}
          imageStyle={styles.camera2}
        />

      </View>
    </View>
  );
};

export default TakePicture;

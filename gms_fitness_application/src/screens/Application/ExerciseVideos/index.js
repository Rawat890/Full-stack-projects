import { FlashList } from '@shopify/flash-list';
import LoadingModal from 'components/LoadingModal';
import { Body2, Heading2 } from 'components/TextComponents';
import { Video } from 'expo-av';
import { fetchVideos } from 'firebase/Workouts';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PermissionsAndroid,
  Pressable,
  View,
  Platform,
} from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-toast-message';

import PressableImage from '../../../components/PressableImage';
import { download } from '../../../utilities/constants/images';

import { styles } from './styles';

const ExerciseVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { t } = useTranslation();
  const videoRefs = useRef({});

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const data = await fetchVideos();
        setVideos(data[0]?.videos || []);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: t('errorFetchingVideo'),
        });
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, [t]);

  const handlePress = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const downloadVideo = async (videoUrl) => {
    try {
      Toast.show({
        type: 'success',
        text1: t('downloadStarts'),
        visibilityTime: 1000,
      });

      if (Platform.OS === 'android') {
        if (Platform.Version < 30) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to storage to download videos',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Toast.show({
              type: 'error',
              text1: t('permissionDenied'),
              text2: t('noStoragePermission'),
            });
            return;
          }
        }

        if (Platform.Version >= 33) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          );
        }
      }

      const fileExtension = videoUrl.split('.').pop();
      const fileName = `video_${Date.now()}.${fileExtension}`;
      const downloadDir = RNBlobUtil.fs.dirs.DownloadDir;
      const path = `${downloadDir}/${fileName}`;

      await RNBlobUtil.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path,
          title: fileName,
          description: 'Downloading video...',
          mime: 'video/mp4',
          mediaScannable: true,
        },
      }).fetch('GET', videoUrl);

      Toast.show({
        type: 'success',
        text1: t('downloadComplete'),
        text2: t('videoSaved'),
      });

      if (Platform.OS === 'android') {
        RNBlobUtil.fs.scanFile([{ path, mime: 'video/mp4' }]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('downloadFailed'),
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.videoContainer}>
        <Pressable onPress={() => handlePress(index)}>
          <Heading2 style={styles.title}>{item.title}</Heading2>
        </Pressable>

        {selectedIndex === index && (
          <Video
            ref={(ref) => (videoRefs.current[index] = ref)}
            source={{ uri: item.videoUrl }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            shouldPlay
            isLooping={false}
          />
        )}

        <View style={styles.innerContainer1}>
          <Body2 style={styles.duration}>{item.duration}</Body2>
          <PressableImage
            source={download}
            style={styles.icon}
            onPress={() => downloadVideo(item.videoUrl)}
          />
        </View>

        <Body2 style={styles.description}>{item.description}</Body2>
      </View>
    );
  };

  return (
    <>
      <LoadingModal visible={loading} />
      <FlashList
        data={videos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        estimatedItemSize={20}
        extraData={selectedIndex}
      />
    </>
  );
};

export default ExerciseVideos;

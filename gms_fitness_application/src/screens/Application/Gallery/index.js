import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PressableImage from '../../../components/PressableImage';
import { Heading1, Other } from '../../../components/TextComponents';
import { deletePhoto } from '../../../screens/Application/CameraTab/photoSlice';
import dates from '../../../utilities/constants/dates';
import { back, deleteIcon } from '../../../utilities/constants/images';
import { goBack } from '../../../utilities/navigationService';

import { styles } from './styles';

const Gallery = ({ route }) => {
  const { t } = useTranslation();
  const { date, onSelect } = route.params;
  const { photos } = useSelector(state => state.photos);
  const { userData } = useSelector(state => state.user);
  const email = userData.email;
  const dispatch = useDispatch();

  const filteredPhotos = useMemo(() => {
    return photos
      .filter(photo => dayjs(photo.date).format(dates.YYYY_MM_DD) === date)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [photos, date]);

  const handleSelect = useCallback((photo) => {
    onSelect(photo);
    goBack();
  }, [onSelect]);

  const handleDelete = useCallback((photoId) => {
    Alert.alert(
      t('deletePhoto'),
      t('sureDeletePhoto'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => dispatch(deletePhoto({ email, photoId })),
        },
      ],
    );
  }, [dispatch, email, t]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <PressableImage imageStyle={styles.icon} onPress={goBack} source={back} />
          <Heading1 style={styles.header}>{t('choosePhoto')}</Heading1>
          <View />
        </View>

        <Other style={styles.headerDate}>
          {dayjs(date).format(dates.DD_MMMM_YYYY)}
        </Other>
      </View>

      {filteredPhotos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Other style={styles.emptyText}>
            {t('noPhotosFoundOnThisDate')}
          </Other>
        </View>
      ) : (
        <FlashList
          data={filteredPhotos}
          horizontal={true}
          numColumns={1}
          estimatedItemSize={100}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.photoContainer}>
              <Pressable onPress={() => handleSelect(item)}>
                <Image source={{ uri: item.uri }} style={styles.photo} />
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Image source={deleteIcon} style={styles.delIcon} />
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Gallery;

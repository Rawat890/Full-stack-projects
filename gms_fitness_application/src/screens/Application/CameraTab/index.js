import dayjs from 'dayjs';
import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, Pressable, FlatList } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';

import PressableImage from '../../../components/PressableImage';
import { Body1, Other, Heading1, Heading3 } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import { loadPhotos } from '../../../screens/Application/CameraTab/photoSlice';
import dates from '../../../utilities/constants/dates';
import { back, cameraPickIcon } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { goBack, navigate } from '../../../utilities/navigationService';

import { styles } from './styles';

const CameraTab = () => {
  const dispatch = useDispatch();
  const { photos, status } = useSelector(state => state.photos);
  const { userData } = useSelector(state => state.user);
  const { t } = useTranslation();

  const bottomSheetRef = useRef();

  const handleBackNavigation = () => {
    goBack();
  };

  const navigateToCompareScreen = () => {
    navigate(navigationRoutes.COMPARE_YOURSELF);
  };

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const handleOpenCamera = () => {
    bottomSheetRef.current.close();
    navigate(navigationRoutes.TAKE_PICTURE);
  };

  const handleOpenGallery = () => {
    bottomSheetRef.current.close();
    navigate(navigationRoutes.COMPARE_YOURSELF);
  };

  useEffect(() => {
    if (userData?.email) {
      dispatch(loadPhotos(userData.email));
    }
  }, [userData?.email, dispatch]);

  const groupedPhotos = useMemo(() => {
    return photos.reduce((acc, photo) => {
      const date = dayjs(photo.date).format(dates.YYYY_MM_DD);
      if (!acc[date]) { acc[date] = []; }
      acc[date].push(photo);
      acc[date].sort((a, b) => new Date(b.date) - new Date(a.date));
      return acc;
    }, {});
  }, [photos]);

  const sortedDates = useMemo(() => {
    return Object.keys(groupedPhotos).sort((a, b) => new Date(b) - new Date(a));
  }, [groupedPhotos]);

  const renderPhotoItem = useCallback(({ item }) => (
    <Pressable style={styles.photoItem}>
      <Image source={{ uri: item.uri }} style={styles.galleryImage} />
    </Pressable>
  ), []);

  const renderDateSection = useCallback((date) => (
    <View key={date} style={styles.dateSection}>
      <Heading1 style={styles.dateText}>{dayjs(date).format(dates.MMMM_D_YYYY)}</Heading1>
      <FlatList
        data={groupedPhotos[date]}
        renderItem={renderPhotoItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.photoList}
      />
    </View>
  ), [groupedPhotos, renderPhotoItem]);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Other>{t('loadUserData')}</Other>
        <Pressable onPress={handleBackNavigation}>
          <Other>{t('goBack')}</Other>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <PressableImage
            onPress={handleBackNavigation}
            source={back}
            pressableStyle={null}
            imageStyle={styles.icon}
          />
          <Heading1 style={styles.header}>{t('progressPhoto')}</Heading1>
          <View />
        </View>

        <View style={styles.photoContainer}>
          <View style={styles.photoInnerContainer1}>
            <Body1 style={styles.photoText}>
              {t('trackYourProgress')}
              <Other style={styles.photoSecondaryText}> {t('photo')}</Other>
            </Body1>
            <View style={styles.smallBtn}>
              <TextUniversalButton
                label={t('takePhoto')}
                onPress={openBottomSheet}
                compact
              />
            </View>
          </View>
          <Image source={cameraPickIcon} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.compareView}>
          <Body1 style={styles.compareText}>{t('compareMyPhoto')}</Body1>
          <TextUniversalButton label={t('compare')} onPress={navigateToCompareScreen} compact />
        </View>

        <View style={styles.galleryHeader}>
          <Heading3 style={styles.galleryText1}>{t('gallery')}</Heading3>
          <Pressable>
            <Other style={styles.galleryText2}>{t('seeMore')}</Other>
          </Pressable>
        </View>

        {status === 'loading' ? (
          <Other style={styles.loading}>{t('loadingPhotos')}</Other>
        ) : photos.length === 0 ? (
          <View style={styles.emptyGallery}>
            <Other style={styles.emptyText}>{t('noPhotos')}</Other>
          </View>
        ) : (
          <FlatList
            data={sortedDates}
            renderItem={({ item }) => renderDateSection(item)}
            keyExtractor={(date) => date}
            showsVerticalScrollIndicator={false}
            style={styles.item}
          />
        )}

        <RBSheet
          ref={bottomSheetRef}
          height={160}
          openDuration={250}
          customStyles={styles.sheet}
        >
          <Pressable style={styles.optionButton} onPress={handleOpenCamera}>
            <Body1>📷 {t('camera')}</Body1>
          </Pressable>

          <Pressable style={styles.optionButton} onPress={handleOpenGallery}>
            <Body1>🖼️ {t('gallery')}</Body1>
          </Pressable>
        </RBSheet>
      </View>
    </View>
  );
};

export default CameraTab;

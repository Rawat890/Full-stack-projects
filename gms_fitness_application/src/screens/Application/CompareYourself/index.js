import dayjs from 'dayjs';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import PressableImage from '../../../components/PressableImage';
import { Heading1 } from '../../../components/TextComponents';
import { loadPhotos } from '../../../screens/Application/CameraTab/photoSlice';
import dates from '../../../utilities/constants/dates';
import { back } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { goBack, navigate } from '../../../utilities/navigationService';

import PhotoDisplay from './components/PhotoDisplay';
import PickDateWithLabel from './components/PickDateWithLabel';
import { styles } from './styles';

const CompareYourself = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { photos } = useSelector(state => state.photos);
  const { userData } = useSelector(state => state.user);
  const email = userData.email;

  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);

  useEffect(() => {
    dispatch(loadPhotos(email));
  }, [dispatch, email]);

  const updatePhoto = useCallback((date, setPhoto) => {
    if (!date || dayjs(date).isAfter(dayjs(), 'day')) {
      setPhoto(null);
      return;
    }

    const selectedDate = dayjs(date).format(dates.YYYY_MM_DD);
    const filtered = photos.filter(
      photo => dayjs(photo.date).format(dates.YYYY_MM_DD) === selectedDate,
    );
    setPhoto(filtered.length > 0 ? filtered[0] : null);
  }, [photos]);

  useEffect(() => {
    updatePhoto(date1, setPhoto1);
  }, [date1, updatePhoto]);

  useEffect(() => {
    updatePhoto(date2, setPhoto2);
  }, [date2, updatePhoto]);

  const handleSelectPhoto = useCallback((position) => {
    const date = position === 1 ? date1 : date2;
    if (!date) {
      Toast.show({ type: 'error', text1: t('please_date') });
      return;
    }

    navigate(navigationRoutes.GALLERY, {
      date: dayjs(date).format(dates.YYYY_MM_DD),
      position,
      onSelect: (selectedPhoto) => {
        position === 1 ? setPhoto1(selectedPhoto) : setPhoto2(selectedPhoto);
      },
    });
  }, [date1, date2, t]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PressableImage imageStyle={styles.icon} onPress={goBack} source={back} />
        <Heading1 style={styles.header}>{t('comparison')}</Heading1>
        <View />
      </View>

      <View style={styles.pickerContainer}>
        <PickDateWithLabel
          label={t('firstPeriod')}
          date={date1}
          setDate={setDate1}
        />
        <PickDateWithLabel
          label={t('secondPeriod')}
          date={date2}
          setDate={setDate2}
        />
      </View>

      <View style={styles.comparisonContainer}>
        <PhotoDisplay photo={photo1} onChange={() => handleSelectPhoto(1)} />
        <PhotoDisplay photo={photo2} onChange={() => handleSelectPhoto(2)} />
      </View>
    </View>
  );
};

export default CompareYourself;

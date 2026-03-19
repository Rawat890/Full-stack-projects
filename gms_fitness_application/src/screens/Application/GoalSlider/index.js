import { FlashList } from '@shopify/flash-list';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';

import { Body2, Body3, Heading2, Heading3 } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import { storeCompleteUserProfile } from '../../../firebase/UserData';
import { deadLift, runningImage, skippingImage, white_border } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { navigate } from '../../../utilities/navigationService';
import { updateUserProfile } from '../ProfileTab/userSlice';

import { styles } from './styles';

const SLIDES = (t) => [
  {
    id: '1',
    frame: deadLift,
    mainText: t('improve'),
    secondaryText: t('improveText'),
  },
  {
    id: '2',
    frame: skippingImage,
    mainText: t('lean'),
    secondaryText: t('leanText'),
  },
  {
    id: '3',
    frame: runningImage,
    mainText: t('fat'),
    secondaryText: t('fatText'),
  },
];

const GoalSlider = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const slides = SLIDES(t);
  const listRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleConfirm = async () => {
    try {
      const selectedGoal = slides[currentIndex]?.mainText;
      const updatedUserData = {
        ...userData,
        goal: selectedGoal,
      };

      await storeCompleteUserProfile(updatedUserData);
      dispatch(updateUserProfile(updatedUserData));
      navigate(navigationRoutes.REGISTRATION_SUCCESS);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('failedToSaveProgress'),
        text2: t('checkNetworkConnection'),
      });
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.imageRow}>
        <View style={styles.sideDecoration} />
        <View style={styles.frameWrapper}>
          <View style={styles.imageFrame}>
            <Image source={item.frame} style={styles.frameImage} resizeMode="contain" />
          </View>
          <View style={styles.textOverlay}>
            <Heading3 style={styles.title}>{item.mainText}</Heading3>
            <Image source={white_border} style={styles.border} />
            <Body3 style={styles.subtitle}>{item.secondaryText}</Body3>
          </View>
        </View>
        <View style={styles.sideDecoration} />
      </View>
    </View>
  );

  const renderPagination = () =>
    slides.map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          index === currentIndex && styles.paginationDotActive,
        ]}
      />
    ));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Heading2 style={styles.headerTitle}>{t('goal')}</Heading2>
        <Body2 style={styles.headerSubtitle}>{t('goalText')}</Body2>
      </View>

      <FlashList
        ref={listRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        estimatedItemSize={300}
        style={styles.slider}
      />

      <View style={styles.pagination}>{renderPagination()}</View>

      <View style={styles.buttonWrapper}>
        <TextUniversalButton label={t('confirm')} onPress={handleConfirm} />
      </View>
    </View>
  );
};

export default GoalSlider;

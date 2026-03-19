import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable, ImageBackground } from 'react-native';

import PressableImage from '../../../components/PressableImage';
import { Body1, Heading1, Other } from '../../../components/TextComponents';
import { startingCircle, track_your_goal } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { navigate, popTo } from '../../../utilities/navigationService';

import { styles } from './styles';

const TrackYourGoal = () => {
  function navigateToBoardingDoc2() {
    navigate(navigationRoutes.GET_BURN);
  }

  function navigateToRegister(params) {
    popTo(navigationRoutes.SIGN_UP);
  }
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.frame1} source={track_your_goal}>
        <Pressable style={({ pressed }) => [styles.skip, pressed && styles.pressed]} onPress={navigateToRegister}>
          <Other style={styles.skipText}>{t('skip')}</Other>
        </Pressable>
      </ImageBackground>
      <View style={styles.textContainer}>
        <Heading1 style={styles.primaryText} >{t('track')}</Heading1>
        <Body1 style={styles.secondaryText}>{t('doNotWorry')} </Body1>
        <PressableImage
          onPress={navigateToBoardingDoc2}
          source={startingCircle}
          imageStyle={styles.buttonImage}
          pressableStyle={styles.button}
        />
      </View>
    </View>
  );
};

export default TrackYourGoal;

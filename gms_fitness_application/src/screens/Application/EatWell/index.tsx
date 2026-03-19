import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable, ImageBackground } from 'react-native';

import PressableImage from '../../../components/PressableImage';
import { Body1, Heading1, Other } from '../../../components/TextComponents';
import { circleArrow75, eat_Well } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { navigate, popTo } from '../../../utilities/navigationService';

import { styles } from './styles';

const EatWell = () => {
  function navigateToBoardingDoc4() {
    navigate(navigationRoutes.IMPROVE_SLEEP_QUALITY);
  }

  function navigateToRegister() {
    popTo(navigationRoutes.SIGN_UP);
  }

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.frame1} source={eat_Well}>
        <Pressable style={({ pressed }) => [styles.skip, pressed && styles.pressed]} onPress={navigateToRegister}>
          <Other style={styles.skipText}>{t('skip')}</Other>
        </Pressable>
      </ImageBackground>
      <View style={styles.textContainer}>
        <Heading1 style={styles.primaryText}>{t('eat')}</Heading1>
        <Body1 style={styles.secondaryText}>{t('eatSecondary')}/</Body1>
        <PressableImage pressableStyle={styles.button} onPress={navigateToBoardingDoc4} source={circleArrow75} imageStyle={styles.buttonImage} />
      </View>
    </View>
  );
};

export default EatWell;

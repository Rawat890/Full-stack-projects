import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, Pressable, ImageBackground } from 'react-native';

import { Body1, Heading1, Other } from '../../../components/TextComponents';
import { circleArrow50, get_burn } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { navigate, popTo } from '../../../utilities/navigationService';

import { styles } from './styles';

const GetBurn = () => {
  function navigateToBoardingDoc3() {
    navigate(navigationRoutes.EAT_WELL);
  }

  function navigateToRegister() {
    popTo(navigationRoutes.SIGN_UP);
  }
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.frame1} source={get_burn} >
        <Pressable style={({ pressed }) => [styles.skip, pressed && styles.pressed]} onPress={navigateToRegister}>
          <Other style={styles.skipText}>{t('skip')}</Other>
        </Pressable>
      </ImageBackground>
      <View style={styles.textContainer}>
        <Heading1 style={styles.primaryText}>{t('burn')} </Heading1>
        <Body1 style={styles.secondaryText}>{t('burnSecondary')}</Body1>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={navigateToBoardingDoc3}
        >
          <Image style={styles.buttonImage} source={circleArrow50} />
        </Pressable>
      </View>
    </View>
  );
};

export default GetBurn;

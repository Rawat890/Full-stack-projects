import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Pressable, ImageBackground } from 'react-native';

import PressableImage from '../../../components/PressableImage';
import { Other, Heading1, Body1 } from '../../../components/TextComponents';
import { completionCircle, improve_Sleep } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { navigate } from '../../../utilities/navigationService';

import { styles } from './styles';

const ImproveSleepQuality = () => {
  function navigateToRegister() {
    navigate(navigationRoutes.AUTH, { screen: navigationRoutes.SIGN_UP });
  }
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.frame1} source={improve_Sleep}>
        <Pressable style={({ pressed }) => [styles.skip, pressed && styles.pressed]} onPress={navigateToRegister}>
          <Other style={styles.skipText}>{t('skip')}</Other>
        </Pressable>
      </ImageBackground>
      <View style={styles.textContainer}>
        <Heading1 style={styles.primaryText}>{t('sleep')}</Heading1>
        <Body1 style={styles.secondaryText}>{t('sleepSecondary')}</Body1>
        <PressableImage
          onPress={navigateToRegister}
          source={completionCircle}
          imageStyle={styles.buttonImage}
          pressableStyle={styles.button}
        />
      </View>
    </View>
  );
};

export default ImproveSleepQuality;

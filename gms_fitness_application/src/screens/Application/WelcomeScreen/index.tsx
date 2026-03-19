import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Heading1, Heading2 } from '../../../components/TextComponents';
import TextUniversalButton from '../../../components/TextUniversalButton';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { replace } from '../../../utilities/navigationService';

import { styles } from './styles';

const WelcomeScreen = () => {

  const navigateToBoardingDoc1 = () => replace(navigationRoutes.TRACK_YOUR_GOAL);
  const { t } = useTranslation();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Heading1 style={styles.primaryText}>{t('gms')}</Heading1>
          <Heading1 style={styles.secondaryText}>{t('fit')}</Heading1>
        </View>
        <View style={styles.additionalTextContainer}>
          <Heading2 style={styles.additionalText}>{t('every')}</Heading2>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TextUniversalButton label={t('getStarted')} onPress={navigateToBoardingDoc1} />
      </View>
    </View>
  );
};

export default WelcomeScreen;

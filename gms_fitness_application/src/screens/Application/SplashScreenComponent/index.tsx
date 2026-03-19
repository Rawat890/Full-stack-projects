import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Body1, Heading1 } from '../../../components/TextComponents';

import { styles } from './styles';

const SplashScreenComponent = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Heading1 style={styles.primaryText}>{t('gms')}</Heading1>
          <Heading1 style={styles.secondaryText}>{t('fit')}</Heading1>
        </View>
        <View style={styles.additionalTextContainer}>
          <Body1 style={styles.additionalText}>{t('every')}</Body1>
        </View>
      </View>
    </View>
  );
};

export default SplashScreenComponent;

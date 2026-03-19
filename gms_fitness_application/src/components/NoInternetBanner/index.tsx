import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import { styles } from './styles';
import { Body2, Heading2 } from '../../components/TextComponents';
import { ANIMATIONS } from 'utilities/constants/others';

const NoInternetBanner = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <LottieView
          source={ANIMATIONS.noWifi}
          style={styles.noWifi}
          autoPlay
          loop
        />
        <Heading2 style={styles.title}>{t('noInternetConnection')}</Heading2>
        <Body2 style={styles.message}>{t('pleaseCheckNetwork')}</Body2>
      </View>

    </View>
  );
};

export default NoInternetBanner;

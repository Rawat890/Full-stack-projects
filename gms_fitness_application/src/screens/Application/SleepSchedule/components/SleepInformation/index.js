import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image } from 'react-native';

import { Body2, Body3 } from '../../../../../components/TextComponents';
import TextUniversalButton from '../../../../../components/TextUniversalButton';
import { sleepIcon } from '../../../../../utilities/constants/images';

import { styles } from './styles';

const SleepInformation = ({ isClicked, setIsClicked }) => {
  const { t } = useTranslation();

  const learnMoreText = t('learnMore');

  return (
    <View style={styles.sleepContainer}>
      <View style={styles.sleep1}>
        <View style={styles.sleepInnerContainer1}>
          <Body2 style={styles.sleepText}>{t('idealHours')}</Body2>
          <Body3 style={styles.sleepSecondaryText}>{`8${t('hours')} 30${t('minutes')}`}</Body3>
          <View style={styles.smallBtn}>
            <TextUniversalButton label={t('learn')} onPress={() => setIsClicked(prev => !prev)} compact />
          </View>
        </View>
        <Image source={sleepIcon} style={styles.sleepIcon} resizeMode="contain" />
      </View>
      {isClicked && <Body3 style={styles.learnMore}>{learnMoreText}</Body3>}
    </View>
  );
};

export default SleepInformation;

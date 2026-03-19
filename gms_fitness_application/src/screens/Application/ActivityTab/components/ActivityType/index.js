import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, Pressable } from 'react-native';

import { Body1, Body2 } from '../../../../../components/TextComponents';

import { styles } from './styles';

const ActivityType = ({ source, label, info1, info2, onPress }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.activityContainer}>
      <View style={styles.activityInnerContainer1}>
        <Body1 style={styles.activityMainText}>{label}</Body1>
        <Body2 style={styles.activitySecondaryText}>
          {`${info1} | ${info2}`}
        </Body2>
        <Pressable
          style={({ pressed }) => [styles.checkBtn, pressed && styles.pressed]}
          onPress={onPress}
        >
          <Body2 style={styles.checkText}>{t('view')}</Body2>
        </Pressable>
      </View>
      <View style={styles.circle}>
        <Image source={source} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
};

export default ActivityType;

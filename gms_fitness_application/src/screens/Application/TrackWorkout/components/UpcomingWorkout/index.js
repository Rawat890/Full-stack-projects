import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View, Pressable, Alert } from 'react-native';

import { Heading2, Other } from '../../../../../components/TextComponents';
import { deleteIcon } from '../../../../../utilities/constants/images';
import { convertToDate } from '../../../../../utilities/helper/dateFunctions';

import { styles } from './styles';

const UpcomingWorkout = ({ source, heading, time, onDelete, id, date }) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    Alert.alert(
      t('deleteWorkout'),
      t('sureDeleteWorkout'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('delete'),
          onPress: () => onDelete(id),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container1}>
        <View style={styles.circle}>
          <Image source={source} style={styles.image} resizeMode="contain" />
        </View>
        <View>
          <Heading2 style={styles.text1}>{heading}</Heading2>
          <Other style={styles.text2}>{convertToDate(date)}</Other>
        </View>
      </View>
      <Pressable
        onPress={handleDelete}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Image source={deleteIcon} style={styles.icon} />
      </Pressable>
    </View>
  );
};

export default UpcomingWorkout;

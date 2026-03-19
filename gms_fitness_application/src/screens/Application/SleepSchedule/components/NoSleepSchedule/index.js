import React from 'react';
import { Pressable, Image } from 'react-native';

import { Body2 } from '../../../../../components/TextComponents';
import { green_add_button } from '../../../../../utilities/constants/images';
import navigationRoutes from '../../../../../utilities/constants/navigationRoutes';
import { navigate } from '../../../../../utilities/navigationService';

import { styles } from './styles';

const NoSleepSchedule = ({ selectedDate, onSchedule, t }) => {
  return (
    <>
      <Body2 style={styles.noSchedulesText}>{t('noSleepScheduled')}</Body2>
      <Pressable
        style={({ pressed }) => [styles.addBtnContainer, pressed && styles.pressed]}
        onPress={() => {
          onSchedule();
          navigate(navigationRoutes.ADD_SLEEP_SCHEDULE, {
            selectedDate: selectedDate,
          });
        }}
      >
        <Image source={green_add_button} style={styles.addBtn} />
      </Pressable>
    </>
  );
};

export default NoSleepSchedule;

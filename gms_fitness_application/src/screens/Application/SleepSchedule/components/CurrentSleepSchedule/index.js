import React from 'react';
import { View, Image, Pressable } from 'react-native';

import {
  Heading2,
  Body1,
  Body2,
  Other,
} from '../../../../../components/TextComponents';
import { bedImage, verticalThreeDots } from '../../../../../utilities/constants/images';

import { styles } from './styles';

const CurrentSleepSchedule = ({ schedule, progress, isCompleted, timeLeft, onHideSchedule, t }) => {
  const bedtime = new Date(schedule.bedtime);
  const formattedBedtime = bedtime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <Heading2 style={styles.scheduleText}>{t('currentSleepSchedule')}</Heading2>

      <View style={styles.recordItem}>
        <View style={styles.recordItemContainer1}>
          <Image source={bedImage} style={styles.bedIcon} />
          <View>
            <View style={styles.timeRow1}>
              <Other style={styles.timeLabel1}>{t('bedtime')}</Other>
              <Other style={styles.timeValue1}>{formattedBedtime}</Other>
            </View>
            <Body2 style={styles.durationText}>
              {`${t('in')} ${schedule.duration}`}
            </Body2>
          </View>
        </View>
        <Pressable>
          <Image source={verticalThreeDots} style={styles.threeDots} />
        </Pressable>
      </View>

      <View style={styles.progressContainer}>
        <Body2 style={styles.durationText}>
          {`${t('youWillGet')} ${schedule.duration} ${t('tonight')}`}
        </Body2>

        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          <View style={styles.progressTextContainer}>
            <Body2 style={styles.progressText}>
              {`${Math.round(progress * 100)}% ${t('completed')}`}
            </Body2>
          </View>
        </View>

        <View style={styles.progressInfo}>
          {isCompleted ? (
            <>
              <Body2 style={styles.completionText}>{t('completedSleep')}</Body2>
              <Pressable onPress={onHideSchedule}>
                <Other style={styles.doneText}>{t('done')}</Other>
              </Pressable>
            </>
          ) : (
            <Body1 style={styles.timeLeftText}>{timeLeft}</Body1>
          )}
        </View>
      </View>
    </>
  );
};

export default CurrentSleepSchedule;

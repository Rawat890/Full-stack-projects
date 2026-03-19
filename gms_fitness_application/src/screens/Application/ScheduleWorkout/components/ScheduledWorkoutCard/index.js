import React from 'react';
import { Pressable } from 'react-native';

import { Heading3, Other } from '../../../../../components/TextComponents';

import { styles } from './styles';

const ScheduledWorkoutCard = ({ workoutName, time, onPress, isCompleted }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        isCompleted && styles.completedContainer,
      ]}
      onPress={onPress}
    >
      <Heading3
        style={[
          styles.text1,
          isCompleted && styles.completedText,
        ]}
        numberOfLines={1}
      >{workoutName}</Heading3>
      <Other
        style={[
          styles.text1,
          isCompleted && styles.completedText,
        ]}
      >{time}</Other>
    </Pressable>
  );
};

export default ScheduledWorkoutCard;

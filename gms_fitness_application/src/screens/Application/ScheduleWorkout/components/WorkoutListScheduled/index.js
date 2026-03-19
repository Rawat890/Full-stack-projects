import { FlashList } from '@shopify/flash-list';
import React from 'react';

import ScheduledWorkoutCard from '../ScheduledWorkoutCard';

import { styles } from './styles';

const WorkoutListScheduled = ({ data, onWorkoutPress }) => (
  <FlashList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <ScheduledWorkoutCard
        workoutName={item.workoutType}
        time={item.time}
        isCompleted={item.completed}
        onPress={() => onWorkoutPress(item)}
      />
    )}
    estimatedItemSize={100}
    contentContainerStyle={styles.container}
    style={styles.list}
  />
);

export default WorkoutListScheduled;

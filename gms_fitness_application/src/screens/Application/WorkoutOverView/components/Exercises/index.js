import React from 'react';
import { Image, View } from 'react-native';

import PressableImage from '../../../../../components/PressableImage';
import { Body3, Heading3 } from '../../../../../components/TextComponents';
import { grayCircleArrow } from '../../../../../utilities/constants/images';
import navigationRoutes from '../../../../../utilities/constants/navigationRoutes';
import { navigate } from '../../../../../utilities/navigationService';

import { styles } from './styles';

const Exercises = ({ exercises, selectedDifficulty }) => {
  const setKey =
    selectedDifficulty === 'Easy' ? 'set1' :
      selectedDifficulty === 'Intermediate' ? 'set2' :
        'set3';

  function navigateToExerciseDetails(index) {
    navigate(navigationRoutes.EXERCISE_INSTRUCTIONS, {
      workoutDetails: exercises[setKey],
      itemIndex: index,
      difficulty: selectedDifficulty,
    });
  }
  if (!exercises || !exercises[setKey]) { return null; }

  return (
    <>
      {exercises[setKey].map((exercise, index) => (
        <View key={index} style={styles.exerciseCard}>
          <Image source={{ uri: exercise.imageUrl }} style={styles.exerciseImage} />
          <View style={styles.exerciseText}>
            <Heading3 style={styles.exerciseTitle}>{exercise.exercise_name}</Heading3>
            <Body3 style={styles.exerciseTime}>{exercise.Time}</Body3>
          </View>
          <PressableImage
            source={grayCircleArrow}
            onPress={() => navigateToExerciseDetails(index)}
            imageStyle={styles.circleButton}
            pressableStyle={styles.pressed}
          />
        </View>
      ))}
    </>
  );
};

export default Exercises;

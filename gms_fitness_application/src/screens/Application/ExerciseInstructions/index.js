import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView } from 'react-native';

import ExerciseSteps from '../../../components/ExerciseSteps';
import PressableImage from '../../../components/PressableImage';
import { Body1, Heading1, Heading3, Other } from '../../../components/TextComponents';
import { back, twoDots } from '../../../utilities/constants/images';
import { goBack } from '../../../utilities/navigationService';

import { styles } from './style';

const ExerciseInstructions = ({ route }) => {
  const { t } = useTranslation();
  const { workoutDetails, itemIndex, difficulty } = route.params;
  const selectedExercise = workoutDetails[itemIndex];

  if (!selectedExercise) {
    return (
      <View style={styles.container}>
        <Heading1 style={styles.normalText}>{t('exerciseNotFound')}</Heading1>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <PressableImage imageStyle={styles.icon} onPress={goBack} source={back} />
        <PressableImage imageStyle={styles.icon} source={twoDots} />
      </View>

      <View style={styles.gifContainer}>
        <FastImage
          style={styles.gif}
          source={{
            uri: selectedExercise.gifUrl,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Heading1 style={styles.exerciseName}>{selectedExercise.exercise_name}</Heading1>

        <View style={styles.difficultyContainer}>
          <Other style={styles.difficultyText}>{difficulty}</Other>
        </View>

        <Heading3 style={styles.normalText}>{t('descriptions')}</Heading3>

        {selectedExercise.description && (
          <Body1 style={styles.description}>{selectedExercise.description}</Body1>
        )}

        <ExerciseSteps instructions={selectedExercise.instructions} />
      </View>
    </ScrollView>
  );
};

export default ExerciseInstructions;


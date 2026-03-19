import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import { Body2, Heading2, Heading3 } from '../../../../../components/TextComponents';
import TextUniversalButton from '../../../../../components/TextUniversalButton';
import { getWorkoutDetails } from '../../../../../firebase/Workouts';
import navigationRoutes from '../../../../../utilities/constants/navigationRoutes';
import { navigate } from '../../../../../utilities/navigationService';

import { styles } from './styles';

const WorkoutType = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getWorkoutDetails();
        if (data.length > 0) {
          setWorkouts(data[0].workouts);
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: t('failedToFetchWorkoutDetails'),
          text2: t('checkNetworkConnection'),
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [t]);

  function navigateToWorkouts(index) {
    const selectedWorkout = workouts[index];
    navigate(navigationRoutes.WORKOUT_OVERVIEW, { workout: selectedWorkout.title });
  }

  return (
    <ScrollView>
      {isLoading && (
        <Heading3 style={styles.isLoading}>={t('loadingWorkouts')}</Heading3>
      )}
      {workouts.map((item, index) => (
        <View key={index} style={styles.activityContainer}>
          <View style={styles.activityInnerContainer1}>
            <Heading2 style={styles.activityMainText}>{item.title}</Heading2>
            <Body2
              style={styles.activitySecondaryText}
            >{`${item.Total_exercises || item.total_exercises} ${t('exercises')} | ${item.Time}`}</Body2>
            <View style={styles.smallBtn}>
              <TextUniversalButton
                label={t('view')}
                screen="activity"
                onPress={() => navigateToWorkouts(index)}
                color="white"
                compact
              />
            </View>
          </View>
          <View style={styles.circle}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="contain" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default WorkoutType;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ImageBackground, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import PressableImage from '../../../components/PressableImage';
import { Other } from '../../../components/TextComponents';
import { getWorkoutFullDetails } from '../../../firebase/Workouts';
import { back, twoDots, workoutOverView } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { goBack, navigate } from '../../../utilities/navigationService';
import WorkoutContent from '../WorkoutOverView/components/WorkoutContent';

import { styles } from './styles';

const LatestWorkoutOverView = ({ route }) => {
  const { t } = useTranslation();
  const { workout } = route.params;
  const { workoutType: workoutName, difficulty } = workout;

  const [workoutDetails, setWorkoutDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getWorkoutFullDetails(workoutName);
        setWorkoutDetails(data || []);
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
    fetchWorkoutDetails();
  }, [t, workoutName]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={workoutOverView}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.imageButtons}>
          <PressableImage
            onPress={goBack}
            source={back}
            pressableStyle={styles.button}
            imageStyle={styles.icon}
          />
          <PressableImage
            source={twoDots}
            pressableStyle={styles.button}
            imageStyle={styles.icon}
            onPress={() => navigate(navigationRoutes.FITNESS_IMPORTANCE)}
          />
        </View>

      </ImageBackground>

      <View style={styles.staticContent}>
        <ScrollView style={styles.staticContentInner} showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <Other style={styles.loading}>{t('loadingWorkouts')}</Other>
          ) : workoutDetails.length === 0 ? (
            <Other style={styles.loadingText} >{t('noData')}</Other>
          ) : (
            workoutDetails.map((item, index) => (
              <WorkoutContent
                isSchedule={false}
                key={index}
                item={item}
                workoutName={workoutName}
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default LatestWorkoutOverView;

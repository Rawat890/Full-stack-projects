import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';

import PressableImage from '../../../components/PressableImage';
import { Body2 } from '../../../components/TextComponents';
import { getWorkoutFullDetails } from '../../../firebase/Workouts';
import { back, twoDots, workoutOverView } from '../../../utilities/constants/images';
import navigationRoutes from '../../../utilities/constants/navigationRoutes';
import { OTHERS } from '../../../utilities/constants/others';
import { goBack, navigate } from '../../../utilities/navigationService';

import WorkoutContent from './components/WorkoutContent';
import { styles } from './styles';

const WorkoutOverView = ({ route }) => {
  const workoutName = route.params.workout;

  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Intermediate');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getWorkoutFullDetails(workoutName);
        if (data.length > 0) { setWorkouts(data); }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: t('failedToFetchExercise'),
          text2: t('checkNetworkConnection'),
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [workoutName, t]);

  function handlePressOfSchedule() {
    navigate(navigationRoutes.SCHEDULE_WORKOUT, { workoutName: workoutName, difficulty: selectedDifficulty });
  }

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
          />
        </View>
      </ImageBackground>
      <View style={styles.staticContent}>
        <ScrollView style={styles.staticContentInner} showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <Body2 label={t('loadingWorkouts')} style={styles.loading} />
          ) : workouts.length === OTHERS.min_length ? (
            <Body2 label={t('noData')} style={styles.loadingText} />
          ) : (
            workouts.map((item, index) => (
              <WorkoutContent
                isSchedule={true}
                handlePressOfSchedule={handlePressOfSchedule}
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

export default WorkoutOverView;

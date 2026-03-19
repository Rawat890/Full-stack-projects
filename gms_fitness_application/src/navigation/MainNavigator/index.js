import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image } from 'react-native';
import ExerciseVideos from 'screens/Application/ExerciseVideos';
import FitnessImportance from 'screens/Application/FitnessImportance';
import PrivacyPolicy from 'screens/Application/PrivacyPolicy';
import UploadDocs from 'screens/Application/UploadDocs';

import ActivityTab from '../../screens/Application/ActivityTab';
import AddSleepSchedule from '../../screens/Application/AddSleepSchedule';
import AddWorkoutSchedule from '../../screens/Application/AddWorkoutSchedule';
import BmiCalculator from '../../screens/Application/BmiCalculator';
import CameraTab from '../../screens/Application/CameraTab';
import CompareYourself from '../../screens/Application/CompareYourself';
import ExerciseInstructions from '../../screens/Application/ExerciseInstructions';
import Gallery from '../../screens/Application/Gallery';
import GoalSlider from '../../screens/Application/GoalSlider';
import HomeTab from '../../screens/Application/HomeTab';
import LatestWorkoutOverView from '../../screens/Application/LatestWorkoutOverView';
import ProfileSetup from '../../screens/Application/ProfileSetup';
import ProfileTab from '../../screens/Application/ProfileTab';
import RegistrationSuccess from '../../screens/Application/RegistrationSuccess';
import ScheduleWorkout from '../../screens/Application/ScheduleWorkout';
import SleepSchedule from '../../screens/Application/SleepSchedule';
import TakePicture from '../../screens/Application/TakePicture';
import TrackSleep from '../../screens/Application/TrackSleep';
import TrackWorkout from '../../screens/Application/TrackWorkout';
import WorkoutOverView from '../../screens/Application/WorkoutOverView';
import { colors } from '../../utilities/constants/colors';
import { activity_active, activity_inactive, camera_active, camera_inactive, home_active, home_inactive, profile_active, profile_inactive } from '../../utilities/constants/images';
import navigationRoutes from '../../utilities/constants/navigationRoutes';

import { styles } from './styles';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const TabIcon = (focused, activeIcon, inactiveIcon) => (
  <Image
    style={styles.iconStyle}
    source={focused ? activeIcon : inactiveIcon}
  />
);

const BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName={navigationRoutes.HOME_TAB}
      screenOptions={{
        tabBarInactiveTintColor: colors.gray2,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <BottomTabs.Screen
        name={navigationRoutes.HOME_TAB}
        component={HomeTab}
        options={{
          tabBarIcon: ({ focused }) => TabIcon(focused, home_active, home_inactive),
        }}
      />
      <BottomTabs.Screen
        name={navigationRoutes.ACTIVITY_TAB}
        component={ActivityTab}
        options={{
          tabBarIcon: ({ focused }) => TabIcon(focused, activity_active, activity_inactive),
        }}
      />
      <BottomTabs.Screen
        name={navigationRoutes.CAMERA_TAB}
        component={CameraTab}
        options={{
          tabBarIcon: ({ focused }) => TabIcon(focused, camera_active, camera_inactive),
        }}
      />
      <BottomTabs.Screen
        name={navigationRoutes.PROFILE_TAB}
        component={ProfileTab}
        options={{
          tabBarIcon: ({ focused }) => TabIcon(focused, profile_active, profile_inactive),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={navigationRoutes.PROFILE_SETUP}>
      <Stack.Screen name={navigationRoutes.PROFILE_SETUP} component={ProfileSetup} />
      <Stack.Screen name={navigationRoutes.GOAL_SLIDER} component={GoalSlider} />
      <Stack.Screen name={navigationRoutes.REGISTRATION_SUCCESS} component={RegistrationSuccess} />
      <Stack.Screen name={navigationRoutes.BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator} />
      <Stack.Screen name={navigationRoutes.BMI} component={BmiCalculator} />
      <Stack.Screen name={navigationRoutes.TRACK_WORKOUT} component={TrackWorkout} />
      <Stack.Screen name={navigationRoutes.WORKOUT_OVERVIEW} component={WorkoutOverView} />
      <Stack.Screen name={navigationRoutes.SCHEDULE_WORKOUT} component={ScheduleWorkout} />
      <Stack.Screen name={navigationRoutes.ADD_SCHEDULE} component={AddWorkoutSchedule} />
      <Stack.Screen name={navigationRoutes.LATEST_WORKOUT_OVERVIEW} component={LatestWorkoutOverView} />
      <Stack.Screen name={navigationRoutes.EXERCISE_INSTRUCTIONS} component={ExerciseInstructions} />
      <Stack.Screen name={navigationRoutes.VIDEO_SCREEN} component={ExerciseVideos} />
      <Stack.Screen name={navigationRoutes.UPLOAD_DOCS} component={UploadDocs} />
      <Stack.Screen name={navigationRoutes.FITNESS_IMPORTANCE} component={FitnessImportance} />
      <Stack.Screen name={navigationRoutes.TRACK_SLEEP} component={TrackSleep} />
      <Stack.Screen name={navigationRoutes.SLEEP_SCHEDULE} component={SleepSchedule} />
      <Stack.Screen name={navigationRoutes.ADD_SLEEP_SCHEDULE} component={AddSleepSchedule} />
      <Stack.Screen name={navigationRoutes.TAKE_PICTURE} component={TakePicture} />
      <Stack.Screen name={navigationRoutes.COMPARE_YOURSELF} component={CompareYourself} />
      <Stack.Screen name={navigationRoutes.GALLERY} component={Gallery} />
      <Stack.Screen name={navigationRoutes.PRIVACY_POLICY} component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

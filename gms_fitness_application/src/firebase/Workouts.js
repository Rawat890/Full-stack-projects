import { getApp } from '@react-native-firebase/app';
import { collection, getDocs, getFirestore } from '@react-native-firebase/firestore';

export const getWorkoutDetails = async () => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    const workoutCollection = collection(db, 'AllWorkouts');
    const snapshot = await getDocs(workoutCollection);
    const workouts = [];

    snapshot.forEach(doc => {
      workouts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return workouts;
  } catch (error) {
    throw error;
  }
};

export const getWorkoutFullDetails = async (title) => {
  let documentName;
  if (title === 'FullBody Workout') {
    documentName = 'Fullbody-Workout';
  } else if (title === 'AB Workout') {
    documentName = 'AB-Workout';
  } else if (title === 'LowerBody Workout' || title === 'Lowerbody Workout') {
    documentName = 'Lower-Workout';
  }
  try {
    const app = getApp();
    const db = getFirestore(app);
    const workoutCollection = collection(db, documentName);
    const snapshot = await getDocs(workoutCollection);
    const workouts = [];

    snapshot.forEach(doc => {
      workouts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return workouts;
  } catch (error) {
    throw error;
  }
};


export const fetchVideos = async () => {
  try {
    const app = getApp();
    const db = getFirestore(app);
    const videoCollection = collection(db, 'FitnessVideos');
    const snapshot = await getDocs(videoCollection);
    const videos = [];

    snapshot.forEach(doc => {
      videos.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return videos;
  } catch (error) {
    throw error;
  }
};



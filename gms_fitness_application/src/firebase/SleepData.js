import { getAuth } from '@react-native-firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, where } from '@react-native-firebase/firestore';

export const addSleepSchedule = async (scheduleData) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    const db = getFirestore();
    const schedulesRef = collection(db, 'sleepRecords');

    const docRef = await addDoc(schedulesRef, {
      email: user.email,
      ...scheduleData,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getSleepSchedules = async (userId) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    const db = getFirestore();
    const q = query(
      collection(db, 'sleepRecords'),
      where('email', '==', user.email),
      orderBy('createdAt', 'desc'),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      bedtime: doc.data().bedtime,
      wakeTime: doc.data().wakeTime,
      date: doc.data().date,
      duration: doc.data().duration,
    }));
  } catch (error) {
    throw error;
  }
};


export const deleteSleepSchedule = async (scheduleId) => {
  try {
    const db = getFirestore();
    await deleteDoc(doc(db, 'sleepRecords', scheduleId));
    return scheduleId;
  } catch (error) {
    throw error;
  }
};

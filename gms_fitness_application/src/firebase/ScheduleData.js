import { getAuth } from '@react-native-firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from '@react-native-firebase/firestore';

export const addSchedule = async (scheduleData) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) { return; }

    const db = getFirestore();
    const schedulesRef = collection(db, 'schedules');

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

export const getSchedules = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) { return; }

    const db = getFirestore();
    const schedulesRef = collection(db, 'schedules');
    const q = query(schedulesRef, where('email', '==', user.email));

    const querySnapshot = await getDocs(q);
    const schedules = [];

    querySnapshot.forEach((doc) => {
      schedules.push({ id: doc.id, ...doc.data() });
    });

    return schedules;
  } catch (error) {
    throw error;
  }
};


export const deleteSchedule = async (scheduleId) => {
  try {
    const db = getFirestore();
    await deleteDoc(doc(db, 'schedules', scheduleId));
    return scheduleId;
  } catch (error) {
    throw error;
  }
};

export const updateSchedule = async (scheduleData) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) { return; }

    const db = getFirestore();
    const scheduleRef = doc(db, 'schedules', scheduleData.id);

    await updateDoc(scheduleRef, {
      ...scheduleData,
      updatedAt: new Date().toISOString(),
    });

    return scheduleData.id;
  } catch (error) {
    throw error;
  }
};



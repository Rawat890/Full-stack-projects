import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from '@react-native-firebase/firestore';

const db = getFirestore();

export const getDataOfUser = async (userId) => {
  try {
    const userDocRef = doc(db, 'Gms-Users', userId);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists) {
      return null;
    }
    return docSnap.data();
  } catch (error) {
    throw error;
  }
};

export const storeCompleteUserProfile = async (userData) => {
  try {
    if (!userData?.uid) {
      return;
    }

    const userDocRef = doc(db, 'Gms-Users', userData.uid);
    if (!userData.email || !userData.fullName) {
      return;
    }

    await setDoc(userDocRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });

    return userData;
  } catch (error) {
    throw error;
  }
};


import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgk5qz4mNA09g-3azau9mgWjd8996uvJU",
  authDomain: "taipeimetrohouse-2.firebaseapp.com",
  projectId: "taipeimetrohouse-2",
  storageBucket: "taipeimetrohouse-2.firebasestorage.app",
  messagingSenderId: "90653753409",
  appId: "1:90653753409:web:b675e99516d61f920d46c0",
  measurementId: "G-EZDH90LHWB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function registerUserWithProfile(email: string, password: string, profileData: object) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    email: user.email,
    createdAt: serverTimestamp(),
    profile: profileData,
    roles: ['user'],
    status: 'active'
  });
  return user;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: any) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, profileData = {}) => {
    await registerUserWithProfile(email, password, profileData);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, loading, login, logout, register };
}

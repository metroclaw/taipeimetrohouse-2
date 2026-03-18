import { initializeApp, getApps } from 'firebase/app';
import type { LeaseAlert, WorkOrderAlert } from '@/types/domain';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
} from 'firebase/firestore';

// 在此放置 Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

// 工單提醒 (WorkOrderAlert) collection name
const workOrderCollection = 'workOrderAlerts';
// 租約提醒 (LeaseAlert) collection name
const leaseAlertCollection = 'leaseAlerts';

type WorkOrderAlertDoc = Omit<WorkOrderAlert, 'id'>;
type LeaseAlertDoc = Omit<LeaseAlert, 'id'>;

export async function getWorkOrders(): Promise<WorkOrderAlert[]> {
  const q = query(collection(db, workOrderCollection));
  const querySnapshot = await getDocs(q);
  const results: WorkOrderAlert[] = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data() as WorkOrderAlertDoc;
    results.push({ id: docSnap.id, ...data });
  });
  return results;
}

export async function updateWorkOrderAlertStatus(id: string, status: WorkOrderAlert['status']): Promise<void> {
  const docRef = doc(db, workOrderCollection, id);
  await updateDoc(docRef, { status, updatedAt: new Date() });
}

export async function getLeaseAlerts(): Promise<LeaseAlert[]> {
  const q = query(collection(db, leaseAlertCollection));
  const querySnapshot = await getDocs(q);
  const results: LeaseAlert[] = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data() as LeaseAlertDoc;
    results.push({ id: docSnap.id, ...data });
  });
  return results;
}

export async function updateLeaseAlertStatus(id: string, status: LeaseAlert['status']): Promise<void> {
  const docRef = doc(db, leaseAlertCollection, id);
  await updateDoc(docRef, { status, updatedAt: new Date() });
}

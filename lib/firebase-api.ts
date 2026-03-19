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
  apiKey: "AIzaSyDgk5qz4mNA09g-3azau9mgWjd8996uvJU",
  authDomain: "taipeimetrohouse-2.firebaseapp.com",
  projectId: "taipeimetrohouse-2",
  storageBucket: "taipeimetrohouse-2.firebasestorage.app",
  messagingSenderId: "90653753409",
  appId: "1:90653753409:web:b675e99516d61f920d46c0",
  measurementId: "G-EZDH90LHWB"
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

const toDate = (value: unknown): Date => {
  if (!value) return new Date();
  // Firestore Timestamp 物件
  // @ts-expect-error 動態偵測 toDate
  if (typeof value === 'object' && typeof value.toDate === 'function') {
    // @ts-expect-error Firestore Timestamp
    return value.toDate();
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value);
  }
  return value as Date;
};

export async function getWorkOrders(): Promise<WorkOrderAlert[]> {
  const q = query(collection(db, workOrderCollection));
  const querySnapshot = await getDocs(q);
  const results: WorkOrderAlert[] = [];
  querySnapshot.forEach((docSnap) => {
    const raw = docSnap.data() as WorkOrderAlertDoc;
    const data: WorkOrderAlert = {
      id: docSnap.id,
      ...raw,
      createdAt: toDate(raw.createdAt),
      updatedAt: toDate(raw.updatedAt),
      dueDate: toDate(raw.dueDate),
    };
    results.push(data);
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
    const raw = docSnap.data() as LeaseAlertDoc;
    const data: LeaseAlert = {
      id: docSnap.id,
      ...raw,
      leaseStart: toDate(raw.leaseStart),
      leaseEnd: toDate(raw.leaseEnd),
      createdAt: toDate(raw.createdAt),
      updatedAt: toDate(raw.updatedAt),
    };
    results.push(data);
  });
  return results;
}

export async function updateLeaseAlertStatus(id: string, status: LeaseAlert['status']): Promise<void> {
  const docRef = doc(db, leaseAlertCollection, id);
  await updateDoc(docRef, { status, updatedAt: new Date() });
}

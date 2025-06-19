
'use server';

import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import type { GenerateStudyPlanOutput as OriginalGenerateStudyPlanOutput, StudyPlanItem } from '@/ai/flows/generate-study-plan';

// User Profile
export interface UserProfile {
  department: string;
  semester: string; // Store semester as string to align with form values
  email?: string; // Optional: store email if needed
}

export async function saveUserProfile(userId: string, profileData: UserProfile): Promise<void> {
  if (!userId) throw new Error("User ID is required to save user profile.");
  const userProfileRef = doc(db, 'users', userId); // Document ID will be the userId
  await setDoc(userProfileRef, { ...profileData, createdAt: serverTimestamp(), lastUpdatedAt: serverTimestamp() }, { merge: true });
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!userId) return null;
  const userProfileRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userProfileRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
}


// For Study Plans
export interface StoredStudyPlan extends OriginalGenerateStudyPlanOutput {
  id: string; // Firestore document ID
  userId: string;
  createdAt: string; // Changed from Timestamp to string (ISO string)
  planItems: StudyPlanItem[]; // Ensure planItems is part of the stored type
}

export async function saveStudyPlan(userId: string, planData: OriginalGenerateStudyPlanOutput): Promise<string> {
  if (!userId) throw new Error("User ID is required to save study plan.");
  // Ensure plan items have isCompleted, default to false if missing
  const itemsWithCompletion = planData.planItems.map(item => ({ ...item, isCompleted: item.isCompleted || false }));

  const docRef = await addDoc(collection(db, 'users', userId, 'studyPlans'), {
    ...planData,
    planItems: itemsWithCompletion,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getStudyPlans(userId: string): Promise<StoredStudyPlan[]> {
  if (!userId) return [];
  const q = query(collection(db, 'users', userId, 'studyPlans'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    // Ensure planItems always exist and have isCompleted property
    const planItems = (data.planItems || []).map((item: StudyPlanItem) => ({
      ...item,
      isCompleted: item.isCompleted || false,
    }));
    const firestoreTimestamp = data.createdAt as Timestamp;
    return {
      id: doc.id,
      userId: data.userId,
      planTitle: data.planTitle,
      planItems,
      // Convert Timestamp to ISO string
      createdAt: firestoreTimestamp ? firestoreTimestamp.toDate().toISOString() : new Date().toISOString(),
    } as StoredStudyPlan;
  });
}


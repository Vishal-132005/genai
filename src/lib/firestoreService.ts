
'use server';

import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import type { GenerateStudyPlanOutput as OriginalGenerateStudyPlanOutput } from '@/ai/flows/generate-study-plan';
import type { User } from 'firebase/auth';

// For Study Plans
export interface StoredStudyPlan extends OriginalGenerateStudyPlanOutput {
  id: string; // Firestore document ID
  userId: string;
  createdAt: Timestamp;
}

export async function saveStudyPlan(userId: string, planData: OriginalGenerateStudyPlanOutput): Promise<string> {
  if (!userId) throw new Error("User ID is required to save study plan.");
  const docRef = await addDoc(collection(db, 'users', userId, 'studyPlans'), {
    ...planData,
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
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt as Timestamp, // Ensure createdAt is typed as Timestamp
    } as StoredStudyPlan;
  });
}

// For Voice Assistant
export interface ChatMessage {
  id?: string; // Firestore document ID
  userId: string;
  userInput: string;
  assistantResponse: string;
  timestamp: Timestamp;
}

export async function saveChatMessage(userId: string, userInput: string, assistantResponse: string): Promise<string> {
  if (!userId) throw new Error("User ID is required to save chat message.");
  const docRef = await addDoc(collection(db, 'users', userId, 'voiceMessages'), {
    userId,
    userInput,
    assistantResponse,
    timestamp: serverTimestamp(),
  });
  return docRef.id;
}

export async function getChatHistory(userId: string): Promise<ChatMessage[]> {
  if (!userId) return [];
  const q = query(collection(db, 'users', userId, 'voiceMessages'), orderBy('timestamp', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      timestamp: data.timestamp as Timestamp, // Ensure timestamp is typed as Timestamp
    } as ChatMessage;
  });
}

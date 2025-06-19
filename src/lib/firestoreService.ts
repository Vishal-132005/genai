
'use server';

import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import type { GenerateStudyPlanOutput as OriginalGenerateStudyPlanOutput, StudyPlanItem } from '@/ai/flows/generate-study-plan';
import type { Question as QuizQuestionType, UserAnswer as QuizUserAnswerType } from '@/app/quiz/page';
import type { GenerateNotesOutput as OriginalGenerateNotesOutput } from '@/ai/flows/generate-notes-flow';

// User Profile
export interface UserProfile {
  department: string;
  semester: string;
  email?: string;
  createdAt?: string; // Changed to string
  lastUpdatedAt?: string; // Changed to string
}

export async function saveUserProfile(userId: string, profileData: Omit<UserProfile, 'createdAt' | 'lastUpdatedAt' | 'email'> & { email?: string }): Promise<void> {
  if (!userId) throw new Error("User ID is required to save user profile.");
  const userProfileRef = doc(db, 'users', userId);
  const dataToSave: any = { ...profileData, lastUpdatedAt: serverTimestamp() };
  
  // Add createdAt only if it's a new document
  const docSnap = await getDoc(userProfileRef);
  if (!docSnap.exists()) {
    dataToSave.createdAt = serverTimestamp();
  }
  
  await setDoc(userProfileRef, dataToSave , { merge: true });
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  if (!userId) return null;
  const userProfileRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userProfileRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const profile: UserProfile = {
        department: data.department,
        semester: data.semester,
        email: data.email,
    };
    if (data.createdAt && data.createdAt instanceof Timestamp) {
        profile.createdAt = data.createdAt.toDate().toISOString();
    }
    if (data.lastUpdatedAt && data.lastUpdatedAt instanceof Timestamp) {
        profile.lastUpdatedAt = data.lastUpdatedAt.toDate().toISOString();
    }
    return profile;
  }
  return null;
}

// Study Plans
export interface StoredStudyPlan extends OriginalGenerateStudyPlanOutput {
  id: string;
  userId: string;
  createdAt: string; 
  planItems: StudyPlanItem[];
}

export async function saveStudyPlan(userId: string, planData: OriginalGenerateStudyPlanOutput): Promise<string> {
  if (!userId) throw new Error("User ID is required to save study plan.");
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
      createdAt: firestoreTimestamp ? firestoreTimestamp.toDate().toISOString() : new Date().toISOString(),
    } as StoredStudyPlan;
  });
}

// Quiz Attempts
export interface StoredQuizAttempt {
  id: string;
  userId: string;
  topic: string;
  numQuestions: number;
  questions: QuizQuestionType[];
  userAnswers: QuizUserAnswerType[];
  score: number;
  createdAt: string; // ISO string
}

export async function saveQuizAttempt(
  userId: string,
  attemptData: Omit<StoredQuizAttempt, 'id' | 'userId' | 'createdAt'>
): Promise<string> {
  if (!userId) throw new Error("User ID is required to save quiz attempt.");
  const docRef = await addDoc(collection(db, 'users', userId, 'quizAttempts'), {
    ...attemptData,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getQuizAttempts(userId: string): Promise<StoredQuizAttempt[]> {
  if (!userId) return [];
  const q = query(collection(db, 'users', userId, 'quizAttempts'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    const firestoreTimestamp = data.createdAt as Timestamp;
    return {
      id: doc.id,
      userId: data.userId,
      topic: data.topic,
      numQuestions: data.numQuestions,
      questions: data.questions || [],
      userAnswers: data.userAnswers || [],
      score: data.score,
      createdAt: firestoreTimestamp ? firestoreTimestamp.toDate().toISOString() : new Date().toISOString(),
    } as StoredQuizAttempt;
  });
}

// Generated Notes
export interface StoredGeneratedNote extends OriginalGenerateNotesOutput {
  id: string;
  userId: string;
  topicOrPlanDetails: string;
  createdAt: string; // ISO string
}

export async function saveGeneratedNote(
  userId: string,
  noteData: { topicOrPlanDetails: string; generatedNotes: string }
): Promise<string> {
  if (!userId) throw new Error("User ID is required to save generated note.");
  const docRef = await addDoc(collection(db, 'users', userId, 'generatedNotes'), {
    ...noteData,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getGeneratedNotesHistory(userId: string): Promise<StoredGeneratedNote[]> {
  if (!userId) return [];
  const q = query(collection(db, 'users', userId, 'generatedNotes'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    const firestoreTimestamp = data.createdAt as Timestamp;
    return {
      id: doc.id,
      userId: data.userId,
      topicOrPlanDetails: data.topicOrPlanDetails,
      generatedNotes: data.generatedNotes,
      createdAt: firestoreTimestamp ? firestoreTimestamp.toDate().toISOString() : new Date().toISOString(),
    } as StoredGeneratedNote;
  });
}

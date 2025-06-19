
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
}

export async function saveUserProfile(userId: string, profileData: UserProfile): Promise<void> {
  if (!userId) throw new Error("User ID is required to save user profile.");
  const userProfileRef = doc(db, 'users', userId);
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

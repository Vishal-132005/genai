
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Hardcoded Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAei9vlf3DxfFgGD2zyIdC-mdFSOdXpjQA", // Ensure this is your actual API key
  authDomain: "geministudy-vvqy8.firebaseapp.com",
  projectId: "geministudy-vvqy8",
  storageBucket: "geministudy-vvqy8.appspot.com",
  messagingSenderId: "415709276246",
  appId: "1:415709276246:web:e55e7840b03f366d5bb3f7",
  measurementId: "G-YOUR_MEASUREMENT_ID" // Optional, but include if you have it
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

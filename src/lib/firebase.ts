
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

// Hardcoded Firebase configuration
// IMPORTANT: This is generally not recommended for production.
// It's better to use environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyAei9vlf3DxfFgGD2zyIdC-mdFSOdXpjQA",
  authDomain: "geministudy-vvqy8.firebaseapp.com",
  projectId: "geministudy-vvqy8",
  storageBucket: "geministudy-vvqy8.appspot.com", // Corrected from firebasestorage.app to appspot.com
  messagingSenderId: "415709276246",
  appId: "1:415709276246:web:e55e7840b03f366d5bb3f7",
  // measurementId is optional for basic auth, but include if used/available.
  // You might need to fetch this from your Firebase project settings if you intend to use Analytics.
  // measurementId: "G-YOUR_MEASUREMENT_ID" 
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app);

export { app, auth };


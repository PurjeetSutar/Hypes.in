import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Firebase configuration object (replace with your own if necessary)
const firebaseConfig = {
  apiKey: "AIzaSyBo-fvJoG2c0TOA67RQCNSXLUbRSGG6AAA",
  authDomain: "hypesin.firebaseapp.com",
  projectId: "hypesin",
  storageBucket: "hypesin.appspot.com",
  messagingSenderId: "1096787097363",
  appId: "1:1096787097363:web:89afc21f14cea6f57ccce6",
  measurementId: "G-FSFF123PJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

export const db = getFirestore(app);  // Firestore initialization
export const auth = getAuth(app);  // Auth initialization
export const storage = getStorage(app);  // Storage initialization

// Initialize Google Provider for Sign-In
export const provider = new GoogleAuthProvider();

export default app;

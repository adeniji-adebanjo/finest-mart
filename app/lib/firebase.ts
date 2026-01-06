import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVv4PiHku16Xnszwy9bonFTB_WJe1zq1E",
  authDomain: "finestmart-app.firebaseapp.com",
  projectId: "finestmart-app",
  storageBucket: "finestmart-app.appspot.com",
  messagingSenderId: "572533206483",
  appId: "1:572533206483:web:fe115e95368c06b4d89326",
  measurementId: "G-GHZ0FQB788",
};

// Initialize Firebase (singleton pattern for Next.js hot reload)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
};

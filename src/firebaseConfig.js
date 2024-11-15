import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // Updated imports for Firestore v9+

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVv4PiHku16Xnszwy9bonFTB_WJe1zq1E",
  authDomain: "finestmart-app.firebaseapp.com",
  projectId: "finestmart-app",
  storageBucket: "finestmart-app.appspot.com",
  messagingSenderId: "572533206483",
  appId: "1:572533206483:web:fe115e95368c06b4d89326",
  measurementId: "G-GHZ0FQB788",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

// Export the auth and db objects
export {
  auth,
  db, // Export db for Firestore usage
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
};

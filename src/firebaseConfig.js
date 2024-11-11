// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import createUserWithEmailAndPassword
import { getAnalytics } from "firebase/analytics";

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
const auth = getAuth(app); // Initialize auth for authentication
const analytics = getAnalytics(app);

// Export the auth object and createUserWithEmailAndPassword
export { auth, createUserWithEmailAndPassword }; // Export createUserWithEmailAndPassword here

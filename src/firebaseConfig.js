// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Export the auth object for use in authentication
export { auth };

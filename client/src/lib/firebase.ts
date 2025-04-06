import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Using direct Firebase configuration values
// This is not the best practice for security, but works for development
const firebaseConfig = {
  apiKey: "AIzaSyA0GYjb2yyH2TDqwh6FeFNIvahXewxPYuQ",
  authDomain: "bsefcl-loan-portal.firebaseapp.com",
  projectId: "bsefcl-loan-portal",
  storageBucket: "bsefcl-loan-portal.appspot.com",
  messagingSenderId: "635608350670",
  appId: "1:635608350670:web:d89ca2d673e61a1da67cb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
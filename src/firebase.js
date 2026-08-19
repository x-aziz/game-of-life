import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLQP67F22Ox7tCHKSenIIBGTVhrAlBkBg",
  authDomain: "crm-said-abdelaziz.firebaseapp.com",
  projectId: "crm-said-abdelaziz",
  storageBucket: "crm-said-abdelaziz.firebasestorage.app",
  messagingSenderId: "217342381881",
  appId: "1:217342381881:web:8ee8ab1c988f2dacaba2e8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

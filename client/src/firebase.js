// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "thud-thanhhoa.firebaseapp.com",
  projectId: "thud-thanhhoa",
  storageBucket: "thud-thanhhoa.appspot.com",
  messagingSenderId: "607482578652",
  appId: "1:607482578652:web:1e275788720bafd9531619",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

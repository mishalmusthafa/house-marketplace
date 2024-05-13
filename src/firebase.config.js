import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKHQ_Gb7SM0d9bxvpdIAWatIWU2aZ4p20",
  authDomain: "house-market-place-2.firebaseapp.com",
  projectId: "house-market-place-2",
  storageBucket: "house-market-place-2.appspot.com",
  messagingSenderId: "267887337327",
  appId: "1:267887337327:web:1d20b4b737fa74afaed29a",
  measurementId: "G-2LHKQ5JDJC"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
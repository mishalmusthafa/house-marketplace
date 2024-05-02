import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Sl61J_WJbY_hFOnrMVGyAPg6KHHi_P0",
  authDomain: "house-market-place-5b90c.firebaseapp.com",
  projectId: "house-market-place-5b90c",
  storageBucket: "house-market-place-5b90c.appspot.com",
  messagingSenderId: "118184597213",
  appId: "1:118184597213:web:4b006ca4fdd8d414b32d34"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
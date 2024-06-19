// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAs28nH9NWK5DE8iZOBqdMM88wrMEKJZ-4",
  authDomain: "quizzing-8f83a.firebaseapp.com",
  projectId: "quizzing-8f83a",
  storageBucket: "quizzing-8f83a.appspot.com",
  messagingSenderId: "177894979488",
  appId: "1:177894979488:web:ddb29ac2eb5a2b3395d6c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

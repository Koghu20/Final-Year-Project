// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

import Dashboard from "./components/Dashboard";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHCSiWYOcViYIT9Lb4NLbP7zKDIuYfBQk",
  authDomain: "vehicle-tracking-2-b569f.firebaseapp.com",
  databaseURL: "https://vehicle-tracking-2-b569f-default-rtdb.firebaseio.com",
  projectId: "vehicle-tracking-2-b569f",
  storageBucket: "vehicle-tracking-2-b569f.appspot.com",
  messagingSenderId: "87638737808",
  appId: "1:87638737808:web:42ec27e7deca859675a915",
  measurementId: "G-E86X9QRZ59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const dbd = getDatabase(app);

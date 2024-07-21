// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxUY_GPVWyj8kNiak_-hkgQZyUrPR9RrU",
  authDomain: "trainmate-d0be7.firebaseapp.com",
  projectId: "trainmate-d0be7",
  storageBucket: "trainmate-d0be7.appspot.com",
  messagingSenderId: "120303338142",
  appId: "1:120303338142:web:dab1f0cfd96d002598718f",
  measurementId: "G-MV495TYN8S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

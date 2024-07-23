import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxUY_GPVWyj8kNiak_-hkgQZyUrPR9RrU",
  authDomain: "trainmate-d0be7.firebaseapp.com",
  projectId: "trainmate-d0be7",
  storageBucket: "trainmate-d0be7.appspot.com",
  messagingSenderId: "120303338142",
  appId: "1:120303338142:web:dab1f0cfd96d002598718f",
  measurementId: "G-MV495TYN8S",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

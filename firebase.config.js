import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2xKzsK2k1fg3EGlbh80KyEQEqmDJnY7E",
  authDomain: "mingle-7d654.firebaseapp.com",
  databaseURL: "https://mingle-7d654-default-rtdb.firebaseio.com",
  projectId: "mingle-7d654",
  storageBucket: "mingle-7d654.appspot.com",
  messagingSenderId: "714310729729",
  appId: "1:714310729729:web:1b5c2c04d741c9a7a84000",
  measurementId: "G-NWX0QQ4SDD"
}; 

const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
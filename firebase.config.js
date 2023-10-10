import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig2 = {
  apiKey: "AIzaSyC2xKzsK2k1fg3EGlbh80KyEQEqmDJnY7E",
  authDomain: "mingle-7d654.firebaseapp.com",
  databaseURL: "https://mingle-7d654-default-rtdb.firebaseio.com",
  projectId: "mingle-7d654",
  storageBucket: "mingle-7d654.appspot.com",
  messagingSenderId: "714310729729",
  appId: "1:714310729729:web:1b5c2c04d741c9a7a84000",
  measurementId: "G-NWX0QQ4SDD"
}; 
const firebaseConfig = {
  apiKey: "AIzaSyDD9vYfpbND4ZWuTP6Z-zVVirnF7oZeJl8",
  authDomain: "mingle-sa.firebaseapp.com",
  projectId: "mingle-sa",
  storageBucket: "mingle-sa.appspot.com",
  messagingSenderId: "767016594559",
  appId: "1:767016594559:web:77a32544065b28a8d9a34a",
  measurementId: "G-7J8FW22VTV"
};



const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
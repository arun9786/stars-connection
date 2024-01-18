import {initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getDatabase} from 'firebase/database'
export const firebaseConfig = {
    apiKey: "AIzaSyAPq6u697JqACUwgoXmYp-yVUhivso1Yhc",
    authDomain: "stars-connection.firebaseapp.com",
    databaseURL: "https://stars-connection-default-rtdb.firebaseio.com",
    projectId: "stars-connection",
    storageBucket: "stars-connection.appspot.com",
    messagingSenderId: "542861506529",
    appId: "1:542861506529:web:926ef886ccbcd113c404a0",
    measurementId: "G-V9HKSEF6GF"
  };

export const app=initializeApp(firebaseConfig);
export const firestore=getFirestore(app);
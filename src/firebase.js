// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3sZLYu4luy2kvoKclgAce6pihLMGyPEg",
  authDomain: "assignment2-b8970.firebaseapp.com",
  projectId: "assignment2-b8970",
  storageBucket: "assignment2-b8970.appspot.com",
  messagingSenderId: "756298561805",
  appId: "1:756298561805:web:0aa3d0b1bf7d68ef84d844",
  measurementId: "G-W60JH1TTCC"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
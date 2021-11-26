// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfwnNYk4n1lXykaJZb9t82P_6q2EzbT88",
  authDomain: "react8-2f582.firebaseapp.com",
  projectId: "react8-2f582",
  storageBucket: "react8-2f582.appspot.com",
  messagingSenderId: "997598340238",
  appId: "1:997598340238:web:ad87a4524f661b3f5f55df",
  measurementId: "G-ZHPTPEC91C"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
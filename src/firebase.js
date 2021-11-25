// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5cUNtt9pvI4yUpFiIQYrss0v5QJ0XVOs",
    authDomain: "reactprac4.firebaseapp.com",
    projectId: "reactprac4",
    storageBucket: "reactprac4.appspot.com",
    messagingSenderId: "69444098864",
    appId: "1:69444098864:web:1d6df59b2295d20606c6f5",
    measurementId: "G-Z54VQD9L19"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
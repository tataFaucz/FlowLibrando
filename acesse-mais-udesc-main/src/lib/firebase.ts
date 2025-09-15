// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy72GzrvgW529Dfzan8mXH2ULcJA6QZBA",
  authDomain: "flowlibrando.firebaseapp.com",
  projectId: "flowlibrando",
  storageBucket: "flowlibrando.firebasestorage.app",
  messagingSenderId: "1009507412922",
  appId: "1:1009507412922:web:166bdd852d621a9b6fcb83",
  measurementId: "G-VV7FQ60K7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAXAWRghTRNb1JcVsJpC0iVslGhIFyY3M",
  authDomain: "register-project-first-take.firebaseapp.com",
  projectId: "register-project-first-take",
  storageBucket: "register-project-first-take.appspot.com",
  messagingSenderId: "1093052842039",
  appId: "1:1093052842039:web:4f4a7ac948a273d5817fb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
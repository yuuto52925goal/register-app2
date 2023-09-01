import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAAXAWRghTRNb1JcVsJpC0iVslGhIFyY3M",
  authDomain: "register-project-first-take.firebaseapp.com",
  projectId: "register-project-first-take",
  storageBucket: "register-project-first-take.appspot.com",
  messagingSenderId: "1093052842039",
  appId: "1:1093052842039:web:4f4a7ac948a273d5817fb2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

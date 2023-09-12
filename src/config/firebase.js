import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6HP6AvL14nWrFXsvcZGZtANVcgscdhq0",
  authDomain: "react-expense-e1e18.firebaseapp.com",
  projectId: "react-expense-e1e18",
  storageBucket: "react-expense-e1e18.appspot.com",
  messagingSenderId: "872257109086",
  appId: "1:872257109086:web:7df38178d23c1f35d408cf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

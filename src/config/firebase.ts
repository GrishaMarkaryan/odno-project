// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqw7XHDs9Ks4FwEsn1XW1yGcoaP1R-fF8",
  authDomain: "odno-firebase.firebaseapp.com",
  projectId: "odno-firebase",
  storageBucket: "odno-firebase.appspot.com",
  messagingSenderId: "583168468156",
  appId: "1:583168468156:web:9cdaf867af9b7af2ff5cb9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

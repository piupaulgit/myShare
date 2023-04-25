// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDulz3j432iDr8AcX__R3nH7PkL8poNOkY",
  authDomain: "myshare-c56bf.firebaseapp.com",
  projectId: "myshare-c56bf",
  storageBucket: "myshare-c56bf.appspot.com",
  messagingSenderId: "542797149257",
  appId: "1:542797149257:web:e88cbab1efa68d35397b98"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const FirebaseDB = getFirestore(firebaseApp);
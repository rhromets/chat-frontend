import firebase from "firebase/compat/app";

import dotenv from "dotenv";
dotenv.config();

const firebaseInit = firebase.initializeApp({
  apiKey: process.env.REACT_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
});

export default firebaseInit;

// Importing the functions 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMV_NDNe11RR9J9Gjy00ZMUJC4SC7SDM4",
  authDomain: "learning-fireauth.firebaseapp.com",
  projectId: "learning-fireauth",
  storageBucket: "learning-fireauth.appspot.com",
  messagingSenderId: "568711088536",
  appId: "1:568711088536:web:a1f996b9d00426b0ba03ed",
  measurementId: "G-G7NHDE8RCF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };




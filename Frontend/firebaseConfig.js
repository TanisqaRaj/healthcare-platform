import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoEocBrbh8fyhAnrvGqp9UNRMBHUwkeeQ",
  authDomain: "healthcare-platform-1e949.firebaseapp.com",
  projectId: "healthcare-platform-1e949",
  storageBucket: "healthcare-platform-1e949.firebasestorage.app",
  messagingSenderId: "913346216359",
  appId: "1:913346216359:web:c22dfe6830490cb3413682",
  measurementId: "G-M7NS4FLWMW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register a user
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user); // User signed up
  } catch (error) {
    console.error(error);
  }
};

// Login a user
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user); // User logged in
  } catch (error) {
    console.error(error);
  }
};

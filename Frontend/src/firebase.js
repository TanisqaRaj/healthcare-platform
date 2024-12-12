import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyABgPRGh8JQy3oASbhERS8wPOwLv99oxOI",
    authDomain: "medimentor-49f5f.firebaseapp.com",
    projectId: "medimentor-49f5f",
    storageBucket: "medimentor-49f5f.firebasestorage.app",
    messagingSenderId: "757187126531",
    appId: "1:757187126531:web:46c5cf2f4547316557b536"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

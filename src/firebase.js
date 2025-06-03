// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore functionality

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBahYbb5WQHlJDOCe9OVlKRR_5g7Du3oXQ",
  authDomain: "jprank-389ed.firebaseapp.com",
  projectId: "jprank-389ed",
  storageBucket: "jprank-389ed.firebasestorage.app",
  messagingSenderId: "595748226126",
  appId: "1:595748226126:web:f3966b61bf9d7061bc2f1f",
  measurementId: "G-KQ49ZQ7YK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore database and functions
export { db, addDoc, collection };
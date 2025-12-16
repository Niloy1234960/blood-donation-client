// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFoWyeONc-CqQSN9T-xjllV0aYsmgfoDA",
  authDomain: "assignment-11-demo-f4f8c.firebaseapp.com",
  projectId: "assignment-11-demo-f4f8c",
  storageBucket: "assignment-11-demo-f4f8c.firebasestorage.app",
  messagingSenderId: "878795712942",
  appId: "1:878795712942:web:082b2ccea9bf6b3461003f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
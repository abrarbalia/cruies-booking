// src/app/firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // ✅ Import Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtCRs1aupJPWosxiVQGZb1zANHSWcWGS4",
  authDomain: "cruise-booking-91dff.firebaseapp.com",
  projectId: "cruise-booking-91dff",
  storageBucket: "cruise-booking-91dff.firebasestorage.app",
  messagingSenderId: "394901265031",
  appId: "1:394901265031:web:9ee5c4124540bda0993622",
  measurementId: "G-XFXL63H9B5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// ✅ Initialize and export Auth
export const auth = getAuth(app);
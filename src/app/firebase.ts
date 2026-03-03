// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
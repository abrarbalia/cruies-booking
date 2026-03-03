// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6a1MdD5X9JDXUn9dYy-APJIPlFn_sF6M",
  authDomain: "cruise-booking-9a6fa.firebaseapp.com",
  projectId: "cruise-booking-9a6fa",
  storageBucket: "cruise-booking-9a6fa.firebasestorage.app",
  messagingSenderId: "544262916106",
  appId: "1:544262916106:web:256b4cfe1636fd221db7f3",
  measurementId: "G-G9P6B6FF1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
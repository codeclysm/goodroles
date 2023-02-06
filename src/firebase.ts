// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBP5n8U9E7evpNf-nzyDciDfP6JyQwByr8",
    authDomain: "goodroles-6f0b2.firebaseapp.com",
    projectId: "goodroles-6f0b2",
    storageBucket: "goodroles-6f0b2.appspot.com",
    messagingSenderId: "976872610423",
    appId: "1:976872610423:web:4f106571f2cee9a194c472",
    measurementId: "G-13SY4267K2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
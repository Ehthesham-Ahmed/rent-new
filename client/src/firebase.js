// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "rent-new-89f36.firebaseapp.com",
    projectId: "rent-new-89f36",
    storageBucket: "rent-new-89f36.appspot.com",
    messagingSenderId: "100106316216",
    appId: "1:100106316216:web:ed922ce29983b5941dc74d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
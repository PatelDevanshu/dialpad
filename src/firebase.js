// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZcKCCu0eLEef80gZNtgh9-NrV_NkozjI",
    authDomain: "audio-call-572b5.firebaseapp.com",
    projectId: "audio-call-572b5",
    storageBucket: "audio-call-572b5.appspot.com",
    messagingSenderId: "1034253958302",
    appId: "1:1034253958302:web:27564c33f9f85c97630f8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8OWn5Pc57nF13IA2PU-diw-tClkQbE5E",
    authDomain: "skill-path-ai.firebaseapp.com",
    projectId: "skill-path-ai",
    storageBucket: "skill-path-ai.firebasestorage.app",
    messagingSenderId: "533198102686",
    appId: "1:533198102686:web:e1fc9c51e68e8160b39b8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

import {getAuth, GoogleAuthProvider, OAuthProvider} from 'firebase/auth'
import {  initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "signintrendwave.firebaseapp.com",
  projectId: "signintrendwave",
  storageBucket: "signintrendwave.firebasestorage.app",
  messagingSenderId: "71690860287",
  appId: "1:71690860287:web:2e48ab1c12435cfd93feca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const googleProvider= new GoogleAuthProvider();
const microsoftProvider=new OAuthProvider("microsoft.com")

export {auth,googleProvider,microsoftProvider}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAnalytics} from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjaMDa-SEZsmIhCgM_3TKZSykCvl1xEGU",
  authDomain: "finman-f7bd3.firebaseapp.com",
  projectId: "finman-f7bd3",
  storageBucket: "finman-f7bd3.appspot.com",
  messagingSenderId: "876915727932",
  appId: "1:876915727932:web:64fc5204e5c17630afad39",
  measurementId: "G-4S39DQGFTF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics=getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB-M0PKlxglURoq-CrASzNc5Ts5X12101A",
    authDomain: "logitracker-a7bd8.firebaseapp.com",
    projectId: "logitracker-a7bd8",
    storageBucket: "logitracker-a7bd8.appspot.com",
    messagingSenderId: "745146446148",
    appId: "1:745146446148:web:a0ef276bafcee40812a711",
    measurementId: "G-67SBS0HXRM"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyAH62VD1Dg0FBkLjbPALDyPJQaG_f4-5x4",
    authDomain: "hr-management-system-3010.firebaseapp.com",
    projectId: "hr-management-system-3010",
    storageBucket: "hr-management-system-3010.appspot.com",
    messagingSenderId: "48186644233",
    appId: "1:48186644233:web:3e5edd56d328e80723e5d8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
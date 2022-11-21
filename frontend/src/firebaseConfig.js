import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMwYyOA35Q3gJn4r49UXDnB4dRJCJ-lYc",
  authDomain: "mernrr-5c2d8.firebaseapp.com",
  projectId: "mernrr-5c2d8",
  storageBucket: "mernrr-5c2d8.appspot.com",
  messagingSenderId: "189911200260",
  appId: "1:189911200260:web:3f02145c0c56ff525f7b51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
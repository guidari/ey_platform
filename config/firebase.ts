// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyAGTFprRk7F_kOT0jRhtds2Lok0nP5XmjI",
  // authDomain: "ey-platform.firebaseapp.com",
  // projectId: "ey-platform",
  // storageBucket: "ey-platform.appspot.com",
  // messagingSenderId: "370770534677",
  // appId: "1:370770534677:web:e5e9533c1ef2f3e275491c",
  // measurementId: "G-LEPFJ6HP1N",

  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "ey-platform",
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }

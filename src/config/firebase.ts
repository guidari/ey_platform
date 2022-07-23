// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  getFirestore,
  onSnapshot,
  doc,
  query,
  where,
  collection,
  getDocs,
  setDoc,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAGTFprRk7F_kOT0jRhtds2Lok0nP5XmjI",
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "ey-platform",
  storageBucket: "ey-platform.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const usersRef = collection(db, "Users")

export const getUserByEmail = async (email: string) => {
  let user

  const q = query(usersRef, where("email", "==", email))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // const userDataFormated = JSON.stringify(userData)
    user = doc.data()
  })
  if (!user) {
    console.log("User not found. We are creating a user for you")
  }
  return user
}

export { app, db, auth }

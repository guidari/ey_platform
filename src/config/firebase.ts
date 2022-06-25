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

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
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

// export const createUser = async (
//   email: string,
//   name: string,
//   image: string
// ) => {
//   setDoc(doc(usersRef), {
//     name: name,
//     email: email,
//     image: image,
//   })
// }

export { app, db }

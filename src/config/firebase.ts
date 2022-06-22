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

export const getUser = async (email: string) => {
  // const unsub = onSnapshot(doc(db, "Users", "QcHoUk3PkIWkH2kO54FD"), (doc) => {
  //   console.log("Current data: ", doc.data())
  // })

  const usersRef = collection(db, "Users")

  let user

  // const q = query(usersRef, where('email', 'in', ['USA', 'Japan']));
  const q = query(usersRef, where("email", "==", email))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const userData = doc.data()
    const userDataFormated = JSON.stringify(userData)
    user = userDataFormated
  })
  return user
}

export { app, db }

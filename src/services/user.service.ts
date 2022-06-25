import {
  getDocs,
  query,
  where,
  collection,
  setDoc,
  doc,
} from "firebase/firestore"
import { db, app } from "../config/firebase"

const usersRef = collection(db, "users")

export const getUser = async (email: string) => {
  let user
  const q = query(usersRef, where("email", "==", email))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // const userDataFormated = JSON.stringify(userData)
    user = doc.data()
    // console.log(user)
  })

  if (!user) {
    console.log("User not found. We are creating a user for you")
  }

  return user
}

export const createUser = async (
  email: string,
  name: string,
  image: string
) => {
  setDoc(doc(usersRef), {
    name: name,
    email: email,
    image: image,
  })
}

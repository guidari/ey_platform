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
  const languages = [
    { language: "Language1", profiency: "Profiency" },
    { language: "Language2", profiency: "Profiency" },
    { language: "Language3", profiency: "Profiency" },
  ]
  setDoc(doc(usersRef), {
    name: name,
    email: email,
    image: image,
    languages: languages,
    eycoin: 0,
  })
}

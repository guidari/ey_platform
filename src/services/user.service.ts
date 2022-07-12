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

export const createUser = async (id: string, email: string, name: string) => {
  const languages = [
    { language: "Language1", profiency: "Profiency" },
    { language: "Language2", profiency: "Profiency" },
    { language: "Language3", profiency: "Profiency" },
  ]
  const image = ""
  const location = ""
  const phone = ""

  const progress = { courses: 0, hours: 0, challenges: 0 }
  setDoc(doc(usersRef, id), {
    id: id,
    email: email,
    name: name,
    image: image,
    location: location,
    phone: phone,
    languages: languages,
    progress: progress,
    eycoin: 0,
    skills: [],
  })
}

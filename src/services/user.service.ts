import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../config/firebase"

const usersRef = collection(db, "users")

export const createUser = async (id: string, email: string, name: string) => {
  const languages = [
    { language: "Language1", profiency: "Profiency" },
    { language: "Language2", profiency: "Profiency" },
    { language: "Language3", profiency: "Profiency" },
  ]
  const image = ""
  const location = ""
  const phone = ""

  const progress = {
    completedCourses: 0,
    coursesInProgress: 0,
    hours: 0,
    challenges: 0,
  }
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
    enrolledCourses: [],
    submitedChallenges: [],
    challenges: 0,
    completedCourses: 0,
    coursesInProgress: 0,
    hours: 0,
    notifications: [],
    appliedJobs: [],
  })
}

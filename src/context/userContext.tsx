import { getAuth } from "firebase/auth"
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import router from "next/router"
import { createContext, ReactNode, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useQuery } from "react-query"
import { db } from "../config/firebase"

type IUser = {
  id: string
  name: string
  email: string
  about: string
  github: string
  linkedin: string
  headline: string
  image: string
  languages: []
  skills: []
  progress: {
    courses: number
    hours: number
    challenges: number
  }
  location: string
  phone: string
}

interface IUserProps {
  children: ReactNode
}

export const UserContext = createContext<IUser | undefined>(undefined)

export function UserProvider({ children }: IUserProps) {
  // const data = [
  //   { name: "Language1" },
  //   { email: "email" },
  //   { about: "Language3" },
  // ]

  const auth = getAuth()

  const [user, loading, error] = useAuthState(auth)
  const [userData, setUserData] = useState<IUser | undefined>(undefined)

  const fetchUserName = async () => {
    // if (typeof window !== "undefined" && loading) return null

    try {
      const q = query(collection(db, "users"), where("id", "==", user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()

      setUserData(data as IUser)
    } catch (err) {}
  }

  useEffect((): any => {
    if (loading) return
    if (!user) return router.push("/login")
    fetchUserName()
  }, [user, loading])

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}

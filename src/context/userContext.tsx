import { getAuth } from "firebase/auth"
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"
import router from "next/router"
import { createContext, ReactNode, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useQuery } from "react-query"
import { db } from "../config/firebase"
import { IUser } from "../interface/IUser"

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
  const [userData, setUserData] = useState<IUser | any>()

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.uid}`), (doc) => {
      setUserData(doc.data())
    })
  }, [user, loading])

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}

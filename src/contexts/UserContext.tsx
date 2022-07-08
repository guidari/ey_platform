import { collection, getDocs, query, where } from "firebase/firestore"
import { getSession, GetSessionParams, useSession } from "next-auth/react"
import { createContext, ReactNode, useState } from "react"
import { useQuery } from "react-query"
import { db } from "../config/firebase"

type IUser = [
  {
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
    progress: []
    location: string
    phone: string
  }
]

interface IUserProps {
  children: ReactNode
  sessionProps?: any
}

export const UserContext = createContext<IUser[]>([])

export function UserProvider({ children, sessionProps }: IUserProps) {
  const usersRef = collection(db, "users")

  // const [users, setUsers] = useState<IUser[]>([])

  const { data, isLoading, error, refetch } = useQuery<any>(
    "users",
    async () => {
      const q = query(
        usersRef,
        where("email", "==", sessionProps.user.email)
        // where("email", "==", "joao@gmail.com")
      )
      const data = await getDocs(q)
      const user = data.docs.map((user) => ({
        ...user.data(),
        id: user.id,
      }))
    }
  )

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  return {
    props: {
      sessionProps: await getSession(context),
    },
  }
}

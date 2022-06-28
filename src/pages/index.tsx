import Layout from "../components/layout"
import { useSession } from "next-auth/react"
import { db } from "../config/firebase"
import { query, where, collection, getDocs } from "firebase/firestore"
import { createUser } from "../services/user.service"

export default function Page() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  if (typeof window !== "undefined" && loading) return null

  const usersRef = collection(db, "users")

  if (session) {
    var userEmail: string
    var userName: string
    var userImage: string

    const getUsers = async () => {
      userEmail = session.user?.email as string
      userName = session.user?.name as string
      userImage = session.user?.image as string

      const q = query(usersRef, where("email", "==", userEmail))
      const data = await getDocs(q)
      if (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).length == 0) {
        return createUser(userEmail, userName, userImage)
      } else {
        return console.log("user already exists")
      }
    }
    getUsers()
  }

  return (
    <Layout>
      <h1>
        Aqui será a Home, onde iremos adicinar elementos que façam sentido para
        usuários logados ou não
      </h1>
    </Layout>
  )
}

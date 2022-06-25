import Layout from "../components/layout"
import { useSession } from "next-auth/react"
import { app, db } from "../config/firebase"
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
import { getUser, createUser } from "../services/user.service"
import { useEffect, useState } from "react"

// interface IUser {
//   email: string
//   name: string
//   image: string
// }

export default function Page() {
  const { data: session } = useSession()

  // const [users, setUsers] = useState([])

  // ;(async function () {
  //   if (session) {
  //     const email = session.user?.email
  //     await getUser(email!).then((resolve: any) => {
  //       setUsers(resolve)
  //     })
  //   }
  // })()

  // const [data, setData] = useState<any[]>([])
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await fetch(
  //         `https://firestore.googleapis.com/v1/projects/ey-platform/databases/(default)/documents/users/aPNUJ1DemoXAHnRFhvNG`
  //       )
  //       const body = await result.json()
  //       setData(body.fields)
  //       console.log("body", body.fields.email)
  //     } catch (err) {
  //       console.log("No user found", err)
  //     }
  //   }

  //   fetchData()
  // }, [])
  const usersRef = collection(db, "users")

  if (session) {
    var userEmail: string
    var userName: string
    var userImage: string

    // const [users, setUsers] = useState<any[]>([])

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

      {/* {users.map((user) => {
        return <h1 key={user.email}>Name: {user.name ?? ""}</h1>
      })} */}
    </Layout>
  )
}

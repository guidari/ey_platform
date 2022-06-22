import Layout from "../components/layout"
import { useSession } from "next-auth/react"
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  DocumentSnapshot,
  query,
  where,
} from "firebase/firestore"
import { app, db, getUserByEmail } from "../config/firebase"

export default function Page() {
  const { data: session } = useSession()

  ;(async function () {
    if (session) {
      // const email = session.user?.email
      const email = "guidari@gmail.com"
      await getUserByEmail(email!).then((resolve) => {
        console.log("Resolve", resolve)
      })
    }
  })()

  // const unsub = onSnapshot(doc(db, "Users", "QcHoUk3PkIWkH2kO54FD"), (doc) => {
  //   console.log("Current data: ", doc.data())
  // })

  // const users = collection(db, "Users")

  // if (session) {
  //   setDoc(doc(users), {
  //     name: session.user?.name,
  //     email: session.user?.email,
  //     image: session.user?.image,
  //   })
  // }

  // console.log(session)

  return (
    <Layout>
      <div className="bg-gray-1 p-10">
        <h1>
          Aqui será a Home, onde iremos adicinar elementos que façam sentido
          para usuários logados ou não
        </h1>
      </div>
    </Layout>
  )
}

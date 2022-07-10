import Layout from "../../components/layout"
import { getSession, GetSessionParams, useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"

import { auth, db } from "../../config/firebase"
import {
  query,
  where,
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import Header from "../../components/Profile/Header"
import About from "../../components/Profile/About"
import Languages from "../../components/Profile/Languages"
import Skills from "../../components/Profile/Skills"
import Experience from "../../components/Profile/Experience"
import Education from "../../components/Profile/Education"
import Spinner from "../../components/Spinner"
import { useAuthState } from "react-firebase-hooks/auth"

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
    location: string
    phone: string
  }
]

export default function Page(props: { sessionProps: any }) {
  // const { data: session, status } = useSession()

  // if (!props.sessionProps) {
  //   return (
  //     <Layout>
  //       <AccessDenied />
  //     </Layout>
  //   )
  // }

  // const usersRef = collection(db, "users")

  // console.log("props.sessionProps.user.email", props.sessionProps.user.email)

  // const { data, isLoading, error, refetch } = useQuery("users", async () => {
  //   const q = query(
  //     usersRef,
  //     where("email", "==", props.sessionProps.user.email)
  //     // where("email", "==", userEmail)
  //     // where("email", "==", "joao@gmail.com")
  //   )
  //   const data = await getDocs(q)
  //   const user = data.docs.map((user) => ({
  //     ...user.data(),
  //     id: user.id,
  //   }))

  //   return user
  // })

  const [user, loading, error] = useAuthState(auth)
  const [userData, setUserData] = useState<any>([])

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("id", "==", user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
      setUserData(data)
    } catch (err) {
      console.error(err)
      alert("An error occured while fetching user data")
    }
  }

  useEffect((): any => {
    if (loading) return
    if (!user)
      return (
        <Layout>
          <AccessDenied />
        </Layout>
      )
    fetchUserName()
  }, [user, loading])

  // Avoid to render the wrong session
  // const loading = status === "loading"
  // if (typeof window !== "undefined" && loading) {
  //   return null
  // }

  // If session exists, display content
  return (
    <Layout>
      {/* Header user info */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <Header
          userData={userData}
          session={props.sessionProps}
          listenToDocumentChange={fetchUserName}
        />
      )}
      {/* Close - Header user info */}
    </Layout>
  )
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

import AccessDenied from "../../components/AccessDenied"
import Layout from "../../components/Layout"

import { getAuth } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import About from "../../components/Profile/About"
import Header from "../../components/Profile/Header"
import Languages from "../../components/Profile/Languages"
import Skills from "../../components/Profile/Skills"
import Video from "../../components/Profile/Video"
import Spinner from "../../components/Spinner"
import { db } from "../../config/firebase"
import NotAuthorized from "../notAuthorized"

interface IUser {
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

export default function Page() {
  const auth = getAuth()

  const [user, loading, error] = useAuthState(auth)
  const [userData, setUserData] = useState<any>([])

  if (!user) {
    return <NotAuthorized />
  }

  const fetchUserName = async () => {
    if (typeof window !== "undefined" && loading) return null

    try {
      const q = query(collection(db, "users"), where("id", "==", user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()

      setUserData(data)
    } catch (err) {
      console.log("User not authenticated")
    }
  }

  useEffect((): any => {
    if (loading) return
    console.log("nao to logado")

    if (!user) {
      return (
        <Layout>
          <AccessDenied />
        </Layout>
      )
    }
    fetchUserName()
  }, [user, loading])

  console.log("user", user)

  // If session exists, display content
  return (
    <Layout>
      {/* {loading ? (<Spinner />) : !user ? (<AccessDenied />)  : user ? (<h1>Logado</h1>)} */}

      {loading ? (
        <Spinner />
      ) : !user ? (
        <AccessDenied />
      ) : (
        <>
          {/* Header user info */}
          {loading ? (
            <Spinner />
          ) : error ? (
            <h1>Error</h1>
          ) : (
            <Header
              userData={userData}
              listenToDocumentChange={fetchUserName}
            />
          )}
          {/* Close - Header user info */}
          <div className="flex">
            <div className="grid grid-cols-2 max-w-screen-xl maxxl:grid-cols-1 m-auto pt-5 gap-5">
              {/* ABOUT */}
              <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
                <About
                  userData={userData}
                  listenToDocumentChange={fetchUserName}
                />
              </section>

              {/* EXPERIENCE */}
              {/* <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
              <Experience />
            </section> */}

              {/* LANGUAGES */}
              <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
                <Languages
                  userData={userData}
                  listenToDocumentChange={fetchUserName}
                />
              </section>

              {/* EDUCATION */}
              {/* <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
              <Education />
            </section> */}

              {/* SKILLS */}
              <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
                <Skills
                  userData={userData}
                  listenToDocumentChange={fetchUserName}
                />
              </section>

              {/* VIDEO INTRODUCTION */}
              <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
                <Video />
              </section>
            </div>
          </div>
        </>
      )}
      {/* {!user && <AccessDenied />} */}
    </Layout>
  )
}

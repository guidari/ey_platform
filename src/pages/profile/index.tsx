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
import Spinner from "../../components/Spinner"
import { db } from "../../config/firebase"

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
          <div className="grid grid-cols-2 max-w-screen-xl maxxl:grid-cols-1 place-it ems-stretch maxxl:place-items-center m-auto pt-5">
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
              <h1 className="text-xl font-semibold">Video Introduction</h1>

              <div className="flex">
                {/* <VideoCameraIcon className="w-6 text-gray-3 bg-yellow-1 rounded-bl-md rounded-tl-md" /> */}
                <input
                  type="file"
                  className="block w-full mt-5 text-sm text-gray-4
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-yellow-1 file:text-gray-3
        hover:opacity-80
      "
                />
              </div>
            </section>
          </div>
        </>
      )}
      {/* {!user && <AccessDenied />} */}
    </Layout>
  )
}

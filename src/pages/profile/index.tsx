import Layout from "../../components/layout"
import { getSession, GetSessionParams, useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"

import { db } from "../../config/firebase"
import {
  query,
  where,
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import Header from "../../components/Profile/Header"
import About from "../../components/Profile/About"
import Languages from "../../components/Profile/Languages"
import Skills from "../../components/Profile/Skills"
import Spinner from "../../components/Spinner"
import { UserContext } from "../../contexts/UserContext"

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
  const { data: session, status } = useSession()

  const userData = useContext(UserContext)

  console.log("userData", userData)

  const usersRef = collection(db, "users")

  const { data, isLoading, error, refetch } = useQuery("users", async () => {
    const q = query(
      usersRef,
      where("email", "==", props.sessionProps.user.email)
      // where("email", "==", "joao@gmail.com")
    )
    const data = await getDocs(q)
    const user = data.docs.map((user) => ({
      ...user.data(),
      id: user.id,
    }))

    return user
  })

  // console.log(data)

  // Avoid to render the wrong session
  const loading = status === "loading"
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      {/* Header user info */}
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <Header
          userData={userData}
          session={session}
          listenToDocumentChange={refetch}
        />
      )}
      {/* Close - Header user info */}
      <div className="grid grid-cols-2 max-w-screen-xl maxxl:grid-cols-1 place-items-left maxxl:place-items-center m-auto pt-5">
        {/* ABOUT */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <h1>Error</h1>
          ) : (
            <About userData={userData} listenToDocumentChange={refetch} />
          )}
        </section>

        {/* EXPERIENCE */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          <h1 className="text-xl font-semibold">Experience</h1>
          <div className="flex gap-5 mt-5">
            <img
              src="/images/ibm.png"
              alt="Company image"
              width="50px"
              className="max-h-12"
            />
            <div>
              <p className="font-medium">IBM</p>
              <p className="font-medium relative inset-y-1 bottom-0">
                Application Developer
              </p>
            </div>
          </div>
          <p className="mt-3">Dec 2020 - Present | 1 yr 7 mos</p>
          <p className="mt-3">lorem ipsum dolor sit amet, consectetur adip</p>

          <div className="flex gap-5 mt-5">
            <img
              src="/images/ibm.png"
              alt="Company image"
              width="50px"
              className="max-h-12"
            />
            <div>
              <p className="font-medium">IBM</p>
              <p className="font-medium relative inset-y-1 bottom-0">
                Application Developer
              </p>
            </div>
          </div>
          <p className="mt-3">Dec 2020 - Present | 1 yr 7 mos</p>
          <p className="mt-3">lorem ipsum dolor sit amet, consectetur adip</p>
        </section>

        {/* LANGUAGES */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <h1>Error</h1>
          ) : (
            <Languages userData={userData} listenToDocumentChange={refetch} />
          )}
        </section>

        {/* EDUCATION */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          <h1 className="text-xl font-semibold">Education</h1>

          <div className="flex gap-5 mt-5">
            <img
              src="/images/fiap.png"
              alt="Company image"
              width="50px"
              className="max-h-12"
            />
            <div>
              <p className="font-medium ">FIAP</p>
              <p className="font-medium relative inset-y-1 bottom-0">
                Bachelor's degree in Information Systems
              </p>
            </div>
          </div>
          <p className="mt-3">Feb 2019 - Dec 2022</p>

          <div className="flex gap-5 mt-5">
            <img
              src="/images/fiap.png"
              alt="Company image"
              width="50px"
              className="max-h-12"
            />
            <div>
              <p className="font-medium ">FIAP</p>
              <p className="font-medium relative inset-y-1 bottom-0">
                Bachelor's degree in Information Systems
              </p>
            </div>
          </div>
          <p className="mt-3">Feb 2019 - Dec 2022</p>
        </section>

        {/* SKILLS */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <h1>Error</h1>
          ) : (
            <Skills userData={userData} listenToDocumentChange={refetch} />
          )}
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

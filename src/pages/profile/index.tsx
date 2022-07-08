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
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import Header from "../../components/Profile/Header"
import About from "../../components/Profile/About"
import Languages from "../../components/Profile/Languages"
import Skills from "../../components/Profile/Skills"
import Experience from "../../components/Profile/Experience"
import Education from "../../components/Profile/Education"
import Spinner from "../../components/Spinner"

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

  if (!props.sessionProps) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  const usersRef = collection(db, "users")

  console.log("props.sessionProps.user.email", props.sessionProps.user.email)

  const { data, isLoading, error, refetch } = useQuery("users", async () => {
    const q = query(
      usersRef,
      where("email", "==", props.sessionProps.user.email)
      // where("email", "==", userEmail)
      // where("email", "==", "joao@gmail.com")
    )
    const data = await getDocs(q)
    const user = data.docs.map((user) => ({
      ...user.data(),
      id: user.id,
    }))

    return user
  })

  // Avoid to render the wrong session
  const loading = status === "loading"
  if (typeof window !== "undefined" && loading) {
    return null
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
          userData={data}
          session={props.sessionProps}
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
            <About userData={data} listenToDocumentChange={refetch} />
          )}
        </section>

        {/* EXPERIENCE */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          <Experience />
        </section>

        {/* LANGUAGES */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <h1>Error</h1>
          ) : (
            <Languages userData={data} listenToDocumentChange={refetch} />
          )}
        </section>

        {/* EDUCATION */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          <Education />
        </section>

        {/* SKILLS */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <h1>Error</h1>
          ) : (
            <Skills userData={data} listenToDocumentChange={refetch} />
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

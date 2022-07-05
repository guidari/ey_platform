import Layout from "../../components/layout"
import { getSession, GetSessionParams, useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"

import { PencilIcon } from "@heroicons/react/outline"

import ModalLanguage from "../../components/Modal/modalLanguage"

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

  const [openModalLanguage, setOpenModalLanguage] = useState(false)

  const [users, setUsers] = useState<any[]>([])
  const [skill, setSkill] = useState<string>()

  const usersRef = collection(db, "users")

  const getUsers = async () => {
    const q = query(
      usersRef,
      where("email", "==", props.sessionProps.user.email)
      // where("email", "==", "gui@gmail.com")
    )
    const data = await getDocs(q)
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const { data, isLoading, error, refetch } = useQuery("users", async () => {
    const q = query(
      usersRef,
      where("email", "==", props.sessionProps.user.email)
      // where("email", "==", "gui@gmail.com")
    )
    const data = await getDocs(q)
    const user = data.docs.map((user) => ({
      ...user.data(),
      id: user.id,
    }))

    return user
  })

  useEffect(() => {
    getUsers()
  }, [])

  const getUserLanguages = () => {
    users.map((user) => {
      let languagesSelection = ""

      if (user.languages === undefined) {
        return
      } else {
        user.languages.forEach((language: any) => {
          languagesSelection += `<div class="py-2">
              <p>${language.language}</p>
              <p class="text-gray-4">${language.profiency}</p>
            </div>`
        })
        document.querySelector("#languagesSelection")!.innerHTML =
          languagesSelection
      }
    })
  }
  getUserLanguages()

  const getUserSkill = () => {
    users.map((user) => {
      let skillSection = ""

      if (user.skills === undefined) {
        return
      } else {
        user.skills.forEach((skill: any) => {
          // skillSection += <Skill skill={skill as string} />
          skillSection += `<span class="flex gap-2 bg-gray-3 py-1 px-4 rounded-md cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-4 text-yellow-1"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            ${skill}
          </span>`
        })
        document.querySelector("#skillSection")!.innerHTML = skillSection
      }
    })
  }
  getUserSkill()

  const createUserSkill = () => {
    let userId
    users.map((user) => {
      userId = user.id
    })

    updateDoc(doc(db, `users/${userId}`), {
      skills: arrayUnion(skill),
    })
    console.log("data added")
  }

  const deleteUserSkill = () => {
    console.log("clicked")
  }

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
        <h1>Loading</h1>
      ) : error ? (
        <h1>Loading</h1>
      ) : (
        <Header
          userData={data}
          session={session}
          listenToDocumentChange={refetch}
        />
      )}
      {/* Close - Header user info */}
      <div className="grid grid-cols-2 max-w-screen-xl maxxl:grid-cols-1 place-items-left maxxl:place-items-center m-auto pt-5">
        {/* ABOUT */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          {isLoading ? (
            <h1>Loading</h1>
          ) : error ? (
            <h1>Loading</h1>
          ) : (
            <About userData={data} listenToDocumentChange={refetch} />
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
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold mb-3">Languages</h1>
            <PencilIcon
              className="w-5 mr-3 text-yellow-1 cursor-pointer"
              onClick={() => {
                setOpenModalLanguage(true)
              }}
            />
            {openModalLanguage && (
              <ModalLanguage
                closeModal={setOpenModalLanguage}
                user={users}
                titleEdit={"Languages"}
                listenToDocumentChange={refetch}
              />
            )}
          </div>

          <div id="languagesSelection" className="divide-y divide-gray-4">
            <div className="py-2">
              <p>Language</p>
              <p className="text-gray-4">Your profiency level</p>
            </div>
          </div>
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
          <h1 className="text-xl font-semibold">Skills</h1>
          <input
            id="skillInput"
            onChange={(event) => setSkill(event.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                createUserSkill()
              }
            }}
            placeholder="Skill"
            type="text"
            className="rounded-lg  bg-gray-3 px-4 py-3  my-5 text-sm w-60 focus:outline-none"
          />

          <div
            id="skillSection"
            className="grid grid-cols-4 maxsm:grid-cols-3 grid-flow-row gap-4"
          >
            {/* <span className="flex gap-2 bg-gray-3 py-1 px-4 rounded-md cursor-pointer">
              <XIcon className="w-4 text-yellow-1" />
              React.js
            </span> */}
          </div>
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

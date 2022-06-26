import Layout from "../../components/layout"
import { getSession, GetSessionParams, useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"
import Skill from "../../components/Skill/skill"

import {
  LocationMarkerIcon,
  PhoneIcon,
  InboxIcon,
  PencilIcon,
  XIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline"

import Modal from "../../components/Modal/modal"
import ModalAbout from "../../components/Modal/modalAbout"

import { db } from "../../config/firebase"
import {
  query,
  where,
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore"
import { useEffect, useState } from "react"

export default function Page(props: { sessionProps: any }) {
  const { data: session } = useSession()

  const [openModal, setOpenModal] = useState(false)
  const [openModalAbout, setOpenModalAbout] = useState(false)

  const [users, setUsers] = useState<any[]>([])
  const [skill, setSkill] = useState<string>()

  const usersRef = collection(db, "users")

  // This fuction is watching hte document in case there is a change
  const userDocumentChange = () => {
    let userId
    users.map((user) => {
      userId = user.id
    })

    onSnapshot(doc(db, `users/${userId}`), (doc) => {
      console.log("Current data: ", doc.data())
    })
  }

  useEffect(() => {}, [userDocumentChange])

  const getUsers = async () => {
    const q = query(
      usersRef,
      where("email", "==", props.sessionProps.user.email)
    )
    const data = await getDocs(q)
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
  getUsers()

  const getUserSkill = () => {
    users.map((user) => {
      let skillSection = ""
      user.skills.forEach((skill: any) => {
        // skillSection += <Skill skill={skill as string} />
        skillSection += `<span class="flex gap-2 bg-gray-3 py-1 px-4 rounded-md cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-4 text-yellow-1"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
        ${skill}
      </span>`
      })
      document.querySelector("#skillSection")!.innerHTML = skillSection
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
      {/* {users.map((user) => {
        return <h1 key={user.email}>Name: {user.email ?? ""}</h1>
      })} */}
      {/* Header user info */}
      <div className="bg-gray-1 p-5">
        <div className="grid gap-4 grid-cols-2 maxlg:grid-cols-1 mx-auto max-w-screen-xl">
          <section className="flex gap-4">
            {users.map((user) => {
              return (
                <img
                  key={user.id}
                  src={user.image ?? ""}
                  alt="User profile picture"
                  width="170px"
                  className="w-170 rounded-md"
                />
              )
            })}

            <div>
              {users.map((user) => {
                return (
                  <h1 className="text-xl font-semibold" key={user.id}>
                    {user.name ?? ""}
                  </h1>
                )
              })}
              <p>Application Developer</p>

              <div className="relative inset-y-6 bottom-0 h-16 maxmd:static maxmd:mt-5">
                <p className="flex">
                  <LocationMarkerIcon className="h-5 w-5 mr-3 text-yellow-1" />
                  Vancouver, Canada
                </p>
                <p className="flex py-2">
                  <InboxIcon className="h-5 w-5 mr-3 text-yellow-1" />
                  {users.map((user) => {
                    return <span key={user.id}>{user.email ?? ""}</span>
                  })}
                </p>
                <p className="flex">
                  <PhoneIcon className="h-5 w-5 mr-3 text-yellow-1" /> +82 2
                  97237-4690
                </p>
              </div>
            </div>
          </section>

          <section className="max-w-2xl">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">Social Medias</h1>
              <PencilIcon
                className="w-5 mr-3 text-yellow-1 cursor-pointer"
                onClick={() => {
                  setOpenModal(true)
                }}
              />
            </div>
            {openModal && <Modal closeModal={setOpenModal} />}
            <div className="grid grid-cols-4 maxsm:grid-cols-2">
              <span>
                <button className="bg-gray-3 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-md inline-flex items-center mt-4">
                  <img
                    className="mr-4"
                    src="/images/github-white.svg"
                    alt="Github Social Media"
                  />
                  <span>Github</span>
                </button>
              </span>
              <span>
                <button className="bg-gray-3 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-md inline-flex items-center mt-4">
                  <img
                    className="mr-4"
                    src="/images/linkedin.png"
                    alt="LinkedIn Social Media"
                    width="20px"
                  />
                  <span>LinkedIn</span>
                </button>
              </span>
            </div>
          </section>
        </div>
      </div>
      {/* Close - Header user info */}
      <div className="grid grid-cols-2 max-w-screen-xl maxxl:grid-cols-1 place-items-left maxxl:place-items-center m-auto pt-5">
        {/* ABOUT */}
        <section className="bg-gray-1 w-[35rem] maxsm:w-5/6 p-5 rounded-md mt-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">About</h1>
            <PencilIcon
              className="w-5 mr-3 text-yellow-1 cursor-pointer"
              onClick={() => {
                setOpenModalAbout(true)
              }}
            />
          </div>
          {openModalAbout && (
            <ModalAbout
              closeModal={setOpenModalAbout}
              aboutText={document.getElementById("aboutText")?.innerText}
              user={users}
            />
          )}
          <p id="aboutText" className="mt-5">
            {users.map((user) => {
              return <span key={user.id}>{user.about ?? ""}</span>
            })}
          </p>
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
          <h1 className="text-xl font-semibold mb-3">Languages</h1>

          <div className="divide-y divide-gray-4">
            <div className="py-2">
              <p>English</p>
              <p className="text-gray-4">Native or bilingual profiency</p>
            </div>

            <div className="py-2">
              <p>Spanish</p>
              <p className="text-gray-4">Professional working proficiency</p>
            </div>

            <div className="py-2">
              <p>Potuguese</p>
              <p className="text-gray-4">Native or bilingual profiency</p>
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

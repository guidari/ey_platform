import Layout from "../../components/layout"
import { useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"
import { app, db } from "../../../config/firebase"
import { doc, getDoc } from "firebase/firestore"

import {
  LocationMarkerIcon,
  PhoneIcon,
  InboxIcon,
  PencilIcon,
  XIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline"

export default function Page() {
  const { data: session, status } = useSession()
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
      <div className="bg-gray-1 p-5">
        <div className="grid gap-4 grid-cols-2 maxlg:grid-cols-1 mx-auto max-w-screen-xl">
          <section className="flex gap-4">
            <img
              src={session.user?.image ?? ""}
              alt="User profile picture"
              width="170px"
              className="w-170 rounded-md"
            />
            <div>
              <h1 className="text-xl font-semibold">{session.user?.name}</h1>
              <p>Application Developer</p>

              <div className="relative inset-y-6 bottom-0 h-16 maxmd:static maxmd:mt-5">
                <p className="flex">
                  <LocationMarkerIcon className="h-5 w-5 mr-3 text-yellow-1" />
                  Vancouver, Canada
                </p>
                <p className="flex py-2">
                  <InboxIcon className="h-5 w-5 mr-3 text-yellow-1" />
                  {session.user?.email}
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
              <PencilIcon className="w-5 mr-3 text-yellow-1 cursor-pointer" />
            </div>

            <div className="grid grid-cols-4 maxsm:grid-cols-2">
              <span>
                <button className="bg-gray-3 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-md inline-flex items-center mt-4">
                  <img className="mr-4" src="/images/github-white.svg" alt="" />
                  <span>Github</span>
                </button>
              </span>
              <span>
                <button className="bg-gray-3 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-md inline-flex items-center mt-4">
                  <img className="mr-4" src="/images/github-white.svg" alt="" />
                  <span>Github</span>
                </button>
              </span>
              <span>
                <button className="bg-gray-3 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-md inline-flex items-center mt-4">
                  <img className="mr-4" src="/images/github-white.svg" alt="" />
                  <span>Github</span>
                </button>
              </span>
              <span>
                <button className="bg-gray-3 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-md inline-flex items-center mt-4">
                  <img className="mr-4" src="/images/github-white.svg" alt="" />
                  <span>Github</span>
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
          <h1 className="text-xl font-semibold">About</h1>
          <p className="mt-5">
            Enthusiast of the best technologies for web & mobile development.
            Passionate for education and changing people's lives through
            programming. More than 200k people already went through one of my
            trainings. “Nothing in this world can take the place of persistence.
            Talent won’t; nothing is more common than unsuccessful men with
            talent. Genius won’t; unrewarded genius is practically a cliché.
            Education won’t; the world is full of educated fools. Persistence
            and determination alone are all-powerful.”
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
            placeholder="Skill"
            type="text"
            className="rounded-lg  bg-gray-3 px-4 py-3  my-5 text-sm w-60 focus:outline-none"
          />
          <div className="grid grid-cols-4 maxsm:grid-cols-3 grid-flow-row gap-4">
            <span className="flex gap-2 bg-gray-3 py-1 px-4 rounded-md cursor-pointer">
              <XIcon className="w-4 text-yellow-1" />
              React.js
            </span>

            <span className="flex gap-2 bg-gray-3 py-1 px-4 rounded-md cursor-pointer">
              <XIcon className="w-4 text-yellow-1" />
              React.js
            </span>
            <span className="flex gap-2 bg-gray-3 py-1 px-4 rounded-md cursor-pointer">
              <XIcon className="w-4 text-yellow-1" />
              React.js
            </span>
            <span className="flex gap-2 bg-gray-3 py-1 px-4 rounded-md cursor-pointer">
              <XIcon className="w-4 text-yellow-1" />
              React.js
            </span>
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

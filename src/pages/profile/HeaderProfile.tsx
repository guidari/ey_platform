import {
  InboxIcon,
  LocationMarkerIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/outline"
import { useState } from "react"
import ModalSocial from "../../components/Modal/modalAbout"

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

type ISession = {
  user: {
    name: string
    email: string
    image: string
  }
  expires: any
  foo: any
}

interface HeaderProps {
  userData: IUser
  session: any
  userDocumentChange: void
}

export function HeaderProfile({
  userData,
  session,
  userDocumentChange,
}: HeaderProps) {
  // listenToDocumentChange: any
  const [openModalSocial, setOpenModalSocial] = useState(false)

  console.log("userData", userData)

  return (
    <div className="bg-gray-1 p-5">
      <div className="grid gap-4 grid-cols-2 maxlg:grid-cols-1 mx-auto max-w-screen-xl">
        <section className="flex gap-4">
          {userData.map((user) => {
            return (
              <img
                key={user.id}
                src={user.image == "" ? `/images/userGeneric.png` : user.image}
                alt="User profile picture"
                width="170px"
                className="w-170 rounded-md"
              />
            )
          })}

          <div>
            {userData.map((user) => {
              return (
                <h1 id="name" className="text-xl font-semibold" key={user.id}>
                  {user.name ?? session.user?.name}
                </h1>
              )
            })}
            {userData.map((user) => {
              return (
                <span id="headline" key={user.id}>
                  {user.location ?? "Headline"}
                </span>
              )
            })}

            <div className="relative inset-y-6 bottom-0 h-16 maxmd:static maxmd:mt-5">
              <p className="flex">
                <LocationMarkerIcon className="h-5 w-5 mr-3 text-yellow-1" />
                {userData.map((user) => {
                  return (
                    <span id="location" key={user.id}>
                      {user.location ?? "Location"}
                    </span>
                  )
                })}
              </p>
              <p className="flex py-2">
                <InboxIcon className="h-5 w-5 mr-3 text-yellow-1" />
                {userData.map((user) => {
                  return (
                    <span id="email" key={user.id}>
                      {user.email ?? session.user?.email}
                    </span>
                  )
                })}
              </p>
              <p className="flex">
                <PhoneIcon className="h-5 w-5 mr-3 text-yellow-1" />
                {userData.map((user) => {
                  return (
                    <span id="phone" key={user.id}>
                      {user.phone ?? "Phone Number"}
                    </span>
                  )
                })}
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
                setOpenModalSocial(true)
              }}
            />
          </div>
          {openModalSocial && (
            <ModalSocial
              closeModal={setOpenModalSocial}
              user={userData}
              titleEdit={"Social Information"}
              listenToDocumentChange={userDocumentChange}
              name={document.querySelector("#name")?.innerHTML ?? ""}
              headline={document.querySelector("#headline")?.innerHTML ?? ""}
              location={document.querySelector("#location")?.innerHTML ?? ""}
              email={document.querySelector("#email")?.innerHTML ?? ""}
              phone={document.querySelector("#phone")?.innerHTML ?? ""}
              github={
                document.querySelector("#github")?.getAttribute("href") ?? ""
              }
              linkedin={
                document.querySelector("#linkedin")?.getAttribute("href") ?? ""
              }
            />
          )}
          {userData.map((user) => {
            const disableLink = (event: { preventDefault: () => void }) => {
              event.preventDefault()
            }
            return (
              <div key={user.id} className="grid grid-cols-4 maxsm:grid-cols-2">
                <a
                  id="github"
                  href={user.github ?? disableLink}
                  target="_blank"
                >
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
                </a>
                <a id="linkedin" href={user.linkedin ?? ""} target="_blank">
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
                </a>
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}

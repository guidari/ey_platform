import {
  InboxIcon,
  LocationMarkerIcon,
  PencilIcon,
  PhoneIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/outline"
import { useState } from "react"
import ModalSocial from "../Modal/modalSocial"

export default function Header({ userData, listenToDocumentChange }) {
  const [openModalSocial, setOpenModalSocial] = useState(false)

  return (
    <div className="bg-gray-1 p-5">
      <div className="grid gap-4 grid-cols-2 maxlg:grid-cols-1 mx-auto max-w-screen-xl">
        <section className="flex gap-4">
          <img
            src={
              userData.image == "" ? `/images/userGeneric.png` : userData.image
            }
            alt="User profile picture"
            width="170px"
            className="w-170 rounded-md"
          />

          <div>
            <h1 id="name" className="text-xl font-semibold">
              {userData.name}
            </h1>

            <span id="headline">{userData.headline ?? "Headline"}</span>

            <div className="relative inset-y-6 bottom-0 h-16 maxmd:static maxmd:mt-5">
              <p className="flex">
                <LocationMarkerIcon className="h-5 w-5 mr-3 text-yellow-1" />

                <span id="location">
                  {userData.location == "" ? "Location" : userData.location}
                </span>
              </p>
              <p className="flex py-2">
                <InboxIcon className="h-5 w-5 mr-3 text-yellow-1" />

                <span id="email">{userData.email}</span>
              </p>
              <p className="flex">
                <PhoneIcon className="h-5 w-5 mr-3 text-yellow-1" />

                <span id="phone">
                  {userData.phone == "" ? "Phone Number" : userData.phone}
                </span>
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
              titleEdit={"Edit Social Information"}
              listenToDocumentChange={listenToDocumentChange}
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

          <div className="grid grid-cols-4 maxsm:grid-cols-2">
            <a id="github" href={userData.github ?? ""} target="_blank">
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
            <a id="linkedin" href={userData.linkedin ?? ""} target="_blank">
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

          <div>
            <h1 className="mt-4 text-xl font-semibold">EYCoin</h1>
            <div className="flex place-items-center">
              <span>
                <CurrencyDollarIcon className="h-5 w-5 mr-2 mt-3 text-yellow-1" />
              </span>
              <p className="mt-2 text-yellow-1 text-xl font-semibold">
                <h1 id="name" className="text-xl font-semibold">
                  {userData.eycoin}
                </h1>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

import { PencilIcon } from "@heroicons/react/outline"
import { useState } from "react"
import ModalAbout from "../../components/Modal/modalAbout"

export default function About({ userData, listenToDocumentChange }) {
  const [openModalAbout, setOpenModalAbout] = useState(false)

  return (
    <>
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
          user={userData}
          titleEdit={"About"}
          listenToDocumentChange={listenToDocumentChange}
        />
      )}
      <p id="aboutText" className="mt-5">
        <span>{userData.about ?? "Tell us about yourself"}</span>
      </p>
    </>
  )
}

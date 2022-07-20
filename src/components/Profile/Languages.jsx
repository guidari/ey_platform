import { PencilIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import ModalLanguage from "../Modal/modalLanguage"

export default function Languages({ userData, listenToDocumentChange }) {
  const [openModalLanguage, setOpenModalLanguage] = useState(false)

  const getUserLanguages = () => {
    let languagesSelection = ""

    if (userData.languages === undefined) {
      return
    } else {
      userData.languages.forEach((language) => {
        languagesSelection += `<div class="py-2">
              <p>${language.language}</p>
              <p class="text-gray-4">${language.profiency}</p>
            </div>`
      })
      document.querySelector("#languagesSelection").innerHTML =
        languagesSelection
    }
  }
  useEffect(() => {
    getUserLanguages()
  })

  return (
    <>
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
            user={userData}
            titleEdit={"Edit Languages"}
            listenToDocumentChange={listenToDocumentChange}
          />
        )}
      </div>
      <div id="languagesSelection" className="divide-y divide-gray-4">
        <div className="py-2">
          <p>Language</p>
          <p className="text-gray-4">Your profiency level</p>
        </div>
      </div>
    </>
  )
}

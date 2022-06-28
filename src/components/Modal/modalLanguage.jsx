import { db } from "../../config/firebase"
import { updateDoc, doc } from "firebase/firestore"

import Modal from "./modal"
import { useEffect } from "react"

export default function ModalLanguage({
  closeModal,
  user,
  titleEdit,
  listenToDocumentChange,
}) {
  const createLanguageInputs = () => {
    user.map((user) => {
      let languagesInput = ""

      if (user.languages === undefined) {
        return
      } else {
        let i = 0
        user.languages.forEach((language) => {
          i++
          languagesInput += `<div class="py-2">
              <p>Language</p>
              <input id="language${i}" defaultValue=${language.language} class="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-2 text-sm w-80 focus:outline-none" />
              <p>Profiency</p>
              <input id="profiency${i}" defaultValue=${language.profiency} class="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-5 text-sm w-80 focus:outline-none" />
            </div>`
        })
        document.querySelector("#languagesInput").innerHTML = languagesInput
      }
    })
  }
  // useEffect(() => {
  //   createLanguageInputs()
  // })

  return (
    <Modal
      closeModal={closeModal}
      saveChanges={undefined}
      titleEdit={titleEdit}
      listenToDocumentChange={listenToDocumentChange}
    >
      <div id="languagesInput"></div>
    </Modal>
  )
}

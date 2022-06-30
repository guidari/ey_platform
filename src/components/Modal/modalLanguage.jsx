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
              <input id="language${i}" value=${language.language} class="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-2 text-sm w-80 focus:outline-none" />
              <p>Profiency</p>
              <select id="profiency${i}" class="rounded-lg bg-gray-1 px-4 py-3  mt-2 mb-5 text-sm w-80 focus:outline-none">
                <option value="Elementary proficiency">Elementary proficiency</option>
                <option value="Limited working proficiency">Limited working proficiency</option>
                <option value="Professional working proficiency">Professional working proficiency</option>
                <option value="Full professional proficiency">Full professional proficiency</option>
                <option value="Native or bilingual profiency">Native or bilingual profiency</option>
              </select>
            </div>`
        })
        document.querySelector("#languagesInput").innerHTML = languagesInput
      }
    })
  }
  useEffect(() => {
    createLanguageInputs()
  })

  const saveLanguageChange = () => {
    let userId
    let userArray
    user.map((user) => {
      userId = user.id
    })

    user.map((user) => {
      userArray = user.languages
      userArray[0].language = document.querySelector("#language1").value
      userArray[0].profiency = document.querySelector("#profiency1").value

      userArray[1].language = document.querySelector("#language2").value
      userArray[1].profiency = document.querySelector("#profiency2").value

      userArray[2].language = document.querySelector("#language3").value
      userArray[2].profiency = document.querySelector("#profiency3").value

      console.log("userArray", userArray)
    })

    updateDoc(doc(db, `users/${userId}`), {
      languages: userArray,
    })
    listenToDocumentChange()
    console.log("Languages updated")
  }

  return (
    <Modal
      closeModal={closeModal}
      saveChanges={saveLanguageChange}
      titleEdit={titleEdit}
      listenToDocumentChange={listenToDocumentChange}
    >
      <h1 className="text-lg leading-6 font-medium text-white mb-3">
        Choose your best 3 languages!
      </h1>
      <div id="languagesInput"></div>
    </Modal>
  )
}

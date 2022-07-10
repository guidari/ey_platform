import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
export default function Skills({ userData, listenToDocumentChange }) {
  const [skill, setSkill] = useState()

  const getUserSkill = () => {
    let skillSection = ""

    if (userData.skills === undefined) {
      return
    } else {
      userData.skills.forEach((skill) => {
        // skillSection += <Skill skill={skill} />
        skillSection += `<button class="btn-skill flex gap-2 bg-gray-3 py-1 px-4 rounded-md cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="w-4 mt-1 text-yellow-1"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            ${skill}
          </button>`
      })
      document.querySelector("#skillSection").innerHTML = skillSection
    }
  }

  useEffect(() => {
    getUserSkill()
  })

  const createUserSkill = () => {
    const userId = userData.id

    updateDoc(doc(db, `users/${userId}`), {
      skills: arrayUnion(skill),
    })
    console.log("data added")
    listenToDocumentChange()
  }

  const deleteUserSkill = () => {
    console.log("clicked")
  }

  return (
    <>
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
      ></div>
    </>
  )
}

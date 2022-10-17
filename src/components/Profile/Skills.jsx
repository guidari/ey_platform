import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../../config/firebase"
import SkillBox from "../SkillBox"
import Spinner from "../Spinner"

export default function Skills({ userData, listenToDocumentChange }) {
  const [skill, setSkill] = useState()

  const createUserSkill = () => {
    const userId = userData.id

    updateDoc(doc(db, `users/${userId}`), {
      skills: arrayUnion(skill),
    })
    console.log("data added")
    listenToDocumentChange()
    const skillInput = document.querySelector("#skillInput")
    skillInput.value = ""
  }

  const deleteUserSkill = (item) => {
    const userId = userData.id

    updateDoc(doc(db, `users/${userId}`), {
      skills: arrayRemove(item),
    })
    console.log("data deleted")
    listenToDocumentChange()
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
        className="grid grid-cols-3 maxsm:grid-cols-2 grid-flow-row gap-4"
      >
        {!userData ? (
          <Spinner />
        ) : (
          userData?.skills?.map((item) => (
            <SkillBox skill={item} onClick={() => deleteUserSkill(item)} />
          ))
        )}
      </div>
    </>
  )
}

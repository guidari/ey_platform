import { db } from "../../config/firebase"
import { updateDoc, doc } from "firebase/firestore"

import Modal from "./modal"

export default function ModalSocial({
  closeModal,
  aboutText,
  user,
  titleEdit,
  listenToDocumentChange,
}) {
  const createUserSkill = () => {
    const userId = user.id

    updateDoc(doc(db, `users/${userId}`), {
      about: about.value,
    })
    closeModal(false)
    listenToDocumentChange()
    console.log("About updated")
  }

  return (
    <Modal
      closeModal={closeModal}
      saveChanges={createUserSkill}
      titleEdit={titleEdit}
      listenToDocumentChange={listenToDocumentChange}
    >
      <textarea
        className="text-white outline-none rounded-md p-3 bg-gray-1 "
        name="about"
        id="about"
        cols="55"
        rows="10"
        defaultValue={aboutText}
      ></textarea>
    </Modal>
  )
}

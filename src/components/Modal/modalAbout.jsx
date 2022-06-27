import { db } from "../../config/firebase"
import { updateDoc, doc } from "firebase/firestore"

import Modal from "./modal"

export default function ModalSocial({
  closeModal,
  aboutText,
  user,
  titleEdit,
}) {
  const createUserSkill = () => {
    let userId
    user.map((user) => {
      userId = user.id
    })

    updateDoc(doc(db, `users/${userId}`), {
      about: about.value,
    })
    closeModal(false)
    console.log("About updated")
  }

  return (
    <Modal
      closeModal={closeModal}
      saveChanges={createUserSkill}
      titleEdit={titleEdit}
    >
      <textarea
        className="text-black outline-none rounded-md p-2"
        name="about"
        id="about"
        cols="55"
        rows="10"
        defaultValue={aboutText}
      ></textarea>
    </Modal>
  )
}

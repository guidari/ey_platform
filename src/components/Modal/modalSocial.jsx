import { db } from "../../config/firebase"
import { updateDoc, doc } from "firebase/firestore"

import Modal from "./modal"

export default function ModalSocial({
  closeModal,
  user,
  titleEdit,
  listenToDocumentChange,
  name,
  headline,
  location,
  email,
  phone,
  github,
  linkedin,
}) {
  const updateSocialInformation = () => {
    let userId
    userId = user.id

    updateDoc(doc(db, `users/${userId}`), {
      name: nameTyped.value,
      headline: headlineTyped.value,
      location: locationTyped.value,
      email: emailTyped.value,
      phone: phoneTyped.value,
      github: githubTyped.value,
      linkedin: linkedinTyped.value,
    })
    closeModal(false)
    listenToDocumentChange()
    console.log("Social Information updated")
  }

  return (
    <Modal
      closeModal={closeModal}
      saveChanges={updateSocialInformation}
      titleEdit={titleEdit}
      listenToDocumentChange={listenToDocumentChange}
    >
      <p>Name:</p>
      <input
        id="nameTyped"
        type="text"
        className="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-5 text-sm w-80 focus:outline-none"
        defaultValue={name}
      />
      <p>Headline:</p>
      <input
        id="headlineTyped"
        type="text"
        className="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-5 text-sm w-80 focus:outline-none"
        defaultValue={headline == "Headline" ? "" : headline}
      />
      <p>Location:</p>
      <input
        id="locationTyped"
        type="text"
        className="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-5 text-sm w-80 focus:outline-none"
        defaultValue={location == "Location" ? "" : location}
      />
      <p>Email:</p>
      <input
        id="emailTyped"
        type="text"
        className="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-5 text-sm w-80 focus:outline-none"
        defaultValue={email}
      />
      <p>Phone:</p>
      <input
        id="phoneTyped"
        type="text"
        className="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-5 text-sm w-80 focus:outline-none"
        defaultValue={phone == "Phone Number" ? "" : phone}
      />
      <p>Gitub Link:</p>
      <input
        id="githubTyped"
        type="text"
        className="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-5 text-sm w-80 focus:outline-none"
        defaultValue={github}
      />
      <p>LinkedIn Link:</p>
      <input
        id="linkedinTyped"
        type="text"
        className="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-5 text-sm w-80 focus:outline-none"
        defaultValue={linkedin}
      />
    </Modal>
  )
}

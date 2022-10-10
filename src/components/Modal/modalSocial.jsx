import { doc, updateDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { db } from "../../config/firebase"

import { CircularProgress } from "@mui/material"
import { useState } from "react"
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
  const [imageUpload, setImageUpload] = useState(null)
  const [loading, setLoading] = useState(null)

  const updateSocialInformation = async () => {
    setLoading(true)
    const userId = user.id

    const storage = getStorage()
    const storageRef = ref(storage, user.id)

    if (imageUpload) {
      uploadBytes(storageRef, imageUpload).then((snapshot) => {
        console.log("Uploaded a blob or file!")
        setLoading(false)
      })
    }

    let image

    if (!imageUpload) {
      image = user.image
    } else {
      image = `https://firebasestorage.googleapis.com/v0/b/ey-platform.appspot.com/o/${user.id}?alt=media&token=be9fab49-74d8-4c91-8d66-9f29c08c94fa`
    }
    console.log("imager", image)
    updateDoc(doc(db, `users/${userId}`), {
      name: nameTyped.value,
      headline: headlineTyped.value,
      location: locationTyped.value,
      email: emailTyped.value,
      phone: phoneTyped.value,
      github: githubTyped.value,
      linkedin: linkedinTyped.value,
      image,
    })

    setLoading(false)
    closeModal(false)
    listenToDocumentChange()
    setImageUpload("")
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
      <p>Profile picture:</p>
      <input
        type="file"
        className="block w-full mt-5 text-sm text-gray-4
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-yellow-1 file:text-gray-3
        hover:opacity-80
      "
        onChange={(event) => {
          setImageUpload(event.target.files[0])
        }}
      />
      {loading && <CircularProgress sx={{ color: "var(--yellow-1)" }} />}
    </Modal>
  )
}

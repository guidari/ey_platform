import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useContext } from "react"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import Modal from "./modal"

export default function ModalSubmitChallenge({
  closeModal,
  challenge,
  challengeId,
}) {
  const userContext = useContext(UserContext)

  const progressChallenge = userContext.progress.challenges
  const progressCompletedCourses = userContext.progress.completedCourses
  const progressEnrolledCourses = userContext.progress.coursesInProgress
  const progressHours = userContext.progress.hours
  const coin = userContext.eycoin

  const submissionsChallenge = challenge.submissions

  function updateDocuments() {
    updateDoc(doc(db, `users/${userContext?.id}`), {
      submitedChallenges: arrayUnion(challengeId),
      challenges: progressChallenge + 1,
      completedCourses: progressCompletedCourses,
      coursesInProgress: progressEnrolledCourses,
      hours: progressHours,
      eycoin: coin + 10,
      progress: {
        challenges: progressChallenge + 1,
        completedCourses: progressCompletedCourses,
        coursesInProgress: progressEnrolledCourses,
        hours: progressHours,
      },
    })
    updateDoc(doc(db, `challenges/${challengeId}`), {
      submissions: submissionsChallenge + 1,
    })
    alert("Challenge submit!!")
  }

  function submiteChallenge() {
    if (userContext.submitedChallenges.length == 0) {
      updateDocuments()
    } else {
      userContext.submitedChallenges.map((item) => {
        if (item != challengeId || item == null || item == undefined) {
          updateDocuments()
        } else {
          alert("Challenge already submited")
        }
      })
    }
  }
  return (
    <Modal
      closeModal={closeModal}
      titleEdit="Submit challenge"
      saveChanges={submiteChallenge}
      sx={{
        postion: "absolute",
        zIndex: 999,
      }}
    >
      <input
        type="text"
        className="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-2 text-sm w-80 focus:outline-none"
        placeholder="Github link"
      />
    </Modal>
  )
}

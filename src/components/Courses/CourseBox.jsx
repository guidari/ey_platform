import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import Link from "next/link"
import { useContext } from "react"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import Button from "../Button/Button"

export default function CourseBox({ coursesData, numberCourses }) {
  const userContext = useContext(UserContext)

  if (userContext) {
    const progressChallenge = userContext.progress.challenges
    const progressCompletedCourses = userContext.progress.completedCourses
    const progressEnrolledCourses = userContext.progress.coursesInProgress
    const progressHours = userContext.progress.hours

    function enrollCourse(event) {
      const value = event.currentTarget.value
      console.log(value)

      updateDoc(doc(db, `users/${userContext?.id}`), {
        enrolledCourses: arrayUnion(value),
        challenges: progressChallenge,
        completedCourses: progressCompletedCourses,
        coursesInProgress: progressEnrolledCourses + 1,
        hours: progressHours,
        progress: {
          challenges: progressChallenge,
          completedCourses: progressCompletedCourses,
          coursesInProgress: progressEnrolledCourses + 1,
          hours: progressHours,
        },
      })
    }

    function cancelCourse(event) {
      const value = event.currentTarget.value

      updateDoc(doc(db, `users/${userContext?.id}`), {
        enrolledCourses: arrayRemove(value),
        challenges: progressChallenge,
        completedCourses: progressCompletedCourses,
        coursesInProgress: progressEnrolledCourses - 1,
        hours: progressHours,
        progress: {
          challenges: progressChallenge,
          completedCourses: progressCompletedCourses,
          coursesInProgress: progressEnrolledCourses - 1,
          hours: progressHours,
        },
      })
    }
  }

  // let Enroll = "Enroll"
  // let Cancel = "Cancel"

  // function updateEnrolledCourses(event) {
  //   const value = event.target.value
  //   let text = event.target

  //   if (text.innerText === "Enroll") {
  //     updateDoc(doc(db, `users/${userContext?.id}`), {
  //       enrolledCourses: arrayUnion(value),
  //     })
  //     text.innerText = "Cancel"
  //   } else {
  //     updateDoc(doc(db, `users/${userContext?.id}`), {
  //       enrolledCourses: arrayRemove(value),
  //     })

  //     text.innerText = "Enroll"
  //   }
  // }

  return (
    <>
      {coursesData.slice(0, numberCourses).map((course) => {
        return (
          <div key={course.id} className="bg-gray-1 rounded-md max-w-md">
            <div className="overflow-hidden rounded-tl-md rounded-tr-md">
              <div className="relative rounded-tl-md rounded-tr-md cursor-pointer hover:scale-110 ease-out duration-300 ">
                <a href={"https://www.udemy.com" + course.url} target="_blank">
                  <img
                    src={course.image_480x270}
                    alt="Course"
                    className="hover:opacity-50 "
                  />
                  <div className="absolute inset-0 z-10 flex place-items-center justify-center opacity-0 hover:opacity-100 ease-out duration-300">
                    <span className="bg-yellow-1 text-gray-3 font-semibold px-4 py-2 rounded-md">
                      Learn More
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-3">
              <h1 className="font-semibold">{course.title}</h1>
              <p className="my-1 text-gray-3 font-semibold text-sm">
                {course.visible_instructors.map((instructor) => {
                  return instructor.title
                })}
              </p>
              <div className="my-2 flex gap-5">
                {userContext && (
                  <Button
                    key={course.id}
                    value={course.id}
                    onClick={(event) => enrollCourse(event)}
                  >
                    Enroll
                  </Button>
                )}

                {!userContext ? (
                  <p>
                    <Link href="/login">
                      <span
                        style={{
                          color: "#FFE600",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Sign in
                      </span>
                    </Link>{" "}
                    to enroll a course
                  </p>
                ) : (
                  userContext?.enrolledCourses != undefined &&
                  userContext?.enrolledCourses.map((index) => {
                    if (index == course.id) {
                      return (
                        <Button
                          key={course.id}
                          value={course.id}
                          onClick={(event) => cancelCourse(event)}
                          color="bg-yellow-2 transition-all duration-500 ease-in-out"
                        >
                          Cancel Enroll
                        </Button>
                      )
                    }
                  })
                )}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

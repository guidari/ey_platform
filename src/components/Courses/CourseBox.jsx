import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import Link from "next/link"
import { useContext, useState } from "react"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import Button from "../Button/Button"

export default function CourseBox({ coursesData, numberCourses }) {
  const userContext = useContext(UserContext)

  const [textButton, setTextButton] = useState("")

  function enrollCourse(event) {
    const value = event.target.value
    console.log(value)

    updateDoc(doc(db, `users/${userContext?.id}`), {
      enrolledCourses: arrayUnion(value),
    })
  }

  function cancelCourse(event) {
    const value = event.target.value
    console.log(value)

    updateDoc(doc(db, `users/${userContext?.id}`), {
      enrolledCourses: arrayRemove(value),
    })
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
            <div className="overflow-hidden ">
              <div className="relative rounded-tl-md rounded-tr-md cursor-pointer hover:scale-110 ease-out duration-300 ">
                <a href={"https://www.udemy.com" + course.url} target="_blank">
                  <img
                    src={course.image_480x270}
                    alt="Course"
                    className="hover:opacity-50 "
                  />
                  <div className="absolute inset-0 z-10 flex place-items-center justify-center opacity-0 hover:opacity-100 ease-out duration-300">
                    <span className="bg-gray-1 px-4 py-2 rounded-md">
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
                <Button
                  key={course.id}
                  value={course.id}
                  onClick={(event) => enrollCourse(event)}
                >
                  Enroll
                </Button>

                {/* {userContext?.enrolledCourses.length === 0 && (
                  <Button
                    key={course.id}
                    value={course.id}
                    onClick={(event) => enrollCourse(event)}
                  >
                    Enroll
                  </Button>
                )} */}

                {userContext?.enrolledCourses.length > 0 &&
                  userContext?.enrolledCourses.map((index) => {
                    if (index == course.id) {
                      return (
                        <Button
                          key={course.id}
                          value={course.id}
                          onClick={(event) => cancelCourse(event)}
                          color="bg-yellow-2"
                        >
                          Cancel Enroll
                        </Button>
                      )
                    }
                    // else {
                    //   return (
                    //     <Button
                    //       key={course.id}
                    //       value={course.id}
                    //       onClick={(event) => enrollCourse(event)}
                    //     >
                    //       Enroll
                    //     </Button>
                    //   )
                    // }
                  })}

                {/* <Button
                  key={course.id}
                  value={course.id}
                  onClick={(event) => updateEnrolledCourses(event)}
                >
                  {userContext?.enrolledCourses.map((index) => {
                    console.log("index", index)
                    if (course.id != index) {
                      console.log("Enroll")
                      return Enroll
                    } else {
                      console.log("Cancel")
                      return Cancel
                    }
                  })}
                </Button> */}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

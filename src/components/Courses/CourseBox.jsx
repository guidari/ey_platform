import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import Link from "next/link"
import { useContext, useState } from "react"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import Button from "../Button/Button"

export default function CourseBox({ coursesData, numberCourses }) {
  const userContext = useContext(UserContext)

  const [hidden, setHidden] = useState("")
  function enrollCourse(event) {
    const value = event.target.value
    console.log(value)

    // updateDoc(doc(db, `users/${userContext.id}`), {
    //   enrolledCourses: arrayUnion(value),
    // })

    // setHidden("hidden")
  }
  return (
    <>
      {coursesData.slice(0, numberCourses).map((course) => {
        return (
          <div key={course.id} className="bg-gray-1 rounded-md max-w-md">
            <img
              src={course.image_480x270}
              alt="Course"
              className="rounded-tl-md rounded-tr-md"
            />
            <div className="p-3">
              <h1 className="font-semibold">{course.title}</h1>
              <p className="my-1 text-gray-3 font-semibold text-sm">
                {course.visible_instructors.map((instructor) => {
                  return instructor.title
                })}
              </p>
              <div className="my-2 flex gap-5">
                <a href={"https://www.udemy.com" + course.url} target="_blank">
                  <Button>Learn More</Button>
                </a>

                <Button
                  value={course.id}
                  onClick={(event) => enrollCourse(event)}
                  color={"yellow"}
                >
                  Enroll
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

import { Box } from "@mui/material"
import { doc, updateDoc } from "firebase/firestore"
import Link from "next/link"
import { useContext } from "react"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import Button from "../Button/Button"

export default function StoreCourse({ coursesData, numberCourses }) {
  const userContext = useContext(UserContext)

  function buyItem() {
    console.log("price", 500)
    if (userContext.eycoin < 500) {
      return alert("You don't have enough coins to buy this")
    }

    const updatedEycoin = userContext.eycoin - 500
    updateDoc(doc(db, `users/${userContext?.id}`), {
      eycoin: updatedEycoin,
    })
    alert("Your item was bought")
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      placeItems: "center",
                    }}
                  >
                    <Button key={course.id} value={course.id} onClick={buyItem}>
                      Buy
                    </Button>
                    <span className="ml-5 text-yellow-2">💰 500</span>
                  </Box>
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

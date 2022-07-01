import Layout from "../components/layout"
import { useSession } from "next-auth/react"
import { db } from "../config/firebase"
import { query, where, collection, getDocs } from "firebase/firestore"
import { createUser } from "../services/user.service"
import { ICourses, ICourse } from "./training/interfaceCourses"
import GrayBox from "../components/GrayBox/grayBox"

export default function Page() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  if (typeof window !== "undefined" && loading) return null

  const usersRef = collection(db, "users")

  if (session) {
    var userEmail: string
    var userName: string
    var userImage: string

    const getUsers = async () => {
      userEmail = session.user?.email as string
      userName = session.user?.name as string
      userImage = session.user?.image as string

      const q = query(usersRef, where("email", "==", userEmail))
      const data = await getDocs(q)
      if (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).length == 0) {
        return createUser(userEmail, userName, userImage)
      } else {
        return console.log("user already exists")
      }
    }
    getUsers()
  }

  let courses: ICourses

  fetch("http://localhost:3333/getData")
    .then((response) => response.json())
    .then((data) => {
      courses = data
      mountCoursesSection()
    })

  const mountCoursesSection = () => {
    console.log("courses", courses.results)
    // let coursesList = ""

    // courses.results.forEach((course: ICourse) => {
    //   coursesList += `
    //     ${course.title} <br>
    //   `

    //   document.querySelector("#coursesList")!.innerHTML = coursesList
    // })
  }

  return (
    <Layout>
      <div className="w-4/6 maxxl:w-5/6 m-auto">
        <h1 className="text-xl font-semibold mt-5">
          Welcome back {session?.user?.name}!
        </h1>
      </div>

      <div className="flex gap-5 w-4/6 maxxl:w-5/6 maxlg:inline m-auto pt-5">
        <div id="column1" className="flex justify-center w-full">
          <GrayBox title="Courses" size="full">
            <p className="mb-5 font-semibold">
              Based on your skills we recommend these courses bellow to improve
              your skills and get ready to work with us
            </p>
            <div className="flex gap-5">
              <div>
                <a
                  href="https://www.udemy.com/course/react-the-complete-guide-incl-redux/"
                  target="_blank"
                >
                  <img width="300px" src="/images/reactCourse.jpg" alt="" />
                </a>
              </div>
              <div>
                <h1 className="font-semibold">
                  React - The Complete Guide (incl Hooks, React Router, Redux)
                </h1>
                <p className="my-3">
                  Dive in and learn React.js from scratch! Learn Reactjs, Hooks,
                  Redux, React Routing, Animations, Next.js and way more!
                </p>
                <p className="text-gray-4">
                  <a
                    href="https://www.udemy.com/user/academind/"
                    target="_blank"
                  >
                    Academind by Maximilian Schwarzmüller
                  </a>
                </p>
              </div>
            </div>
          </GrayBox>
        </div>
        <div id="column2" className="flex justify-center w-3/6 maxlg:w-full">
          <GrayBox title="My Porgress" size="full">
            <h1>oi</h1>
          </GrayBox>
        </div>
      </div>
    </Layout>
  )
}

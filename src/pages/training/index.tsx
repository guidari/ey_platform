import Layout from "../../components/layout"
import { useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"
import { useEffect, useState } from "react"
import GrayBox from "../../components/GrayBox/grayBox"

interface ICourses {
  aggregations: Array<any>
  boosted_language: string
  count: number
  next: string
  previous: string
  results: Array<any>
  search_tracking_id: string
}

interface ICourse {
  curriculum_items: Array<any>
  curriculum_lectures: Array<any>
  headline: string
  id: number
  image_125_H: string
  image_240x135: string
  image_480x270: string
  title: string
  visible_instructors: Array<any>
}

export default function Page() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  if (typeof window !== "undefined" && loading) return null

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

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <div className="flex gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <div id="column1" className="flex justify-center w-fit">
          {/* <div id="coursesList"></div> */}

          <GrayBox title="Courses" size="full">
            <div className="flex gap-5">
              <div>
                <img width="500px" src="/images/reactCourse.jpg" alt="" />
              </div>
              <div>
                <h1>
                  React - The Complete Guide (incl Hooks, React Router, Redux)
                </h1>
                <p>
                  Dive in and learn React.js from scratch! Learn Reactjs, Hooks,
                  Redux, React Routing, Animations, Next.js and way more!
                </p>
                <p>Academind by Maximilian Schwarzmüller</p>
              </div>
            </div>
          </GrayBox>
        </div>
        <div id="column2" className="flex justify-center w-5/6">
          <GrayBox title="Courses" size="full">
            <div id="coursesList"></div>

            <div className="flex gap-5">
              <div>
                <img width="500px" src="/images/reactCourse.jpg" alt="" />
              </div>
              <div>
                <h1>
                  React - The Complete Guide (incl Hooks, React Router, Redux)
                </h1>
                <p>
                  Dive in and learn React.js from scratch! Learn Reactjs, Hooks,
                  Redux, React Routing, Animations, Next.js and way more!
                </p>
                <p>Academind by Maximilian Schwarzmüller</p>
              </div>
            </div>
          </GrayBox>
        </div>
      </div>
    </Layout>
  )
}

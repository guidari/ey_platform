import Layout from "../../components/layout"
import { useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"
import { useEffect, useState } from "react"
import GrayBox from "../../components/GrayBox/grayBox"

import { DesktopComputerIcon } from "@heroicons/react/outline"
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

  // fetch("http://localhost:3333/getData")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     courses = data
  //     mountCoursesSection()
  //   })

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
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <GrayBox title="My Progress" size="full">
          <div className="grid grid-cols-4 maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between px-5 py-2">
            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">11</h1>
                <h2 className="text-xl font-semibold">Completed courses</h2>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">11</h1>
                <h2 className="text-xl font-semibold">Completed courses</h2>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">11</h1>
                <h2 className="text-xl font-semibold">Completed courses</h2>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">11</h1>
                <h2 className="text-xl font-semibold">Completed courses</h2>
              </div>
            </div>
          </div>
        </GrayBox>
        <h1 className="text-xl font-semibold my-5 w-full max2xl:w-5/6 mx-auto">
          Recommended for you
        </h1>
        <div className="grid grid-cols-4 max2xl:w-5/6 m-auto maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between">
          <div className="bg-gray-1 rounded-md max-w-md">
            <img
              src="/images/reactCourse.jpg"
              alt="Course"
              className="rounded-tl-md rounded-tr-md"
            />
            <div className="p-3">
              <h1 className="font-semibold">
                React - The Complete Guide (incl Hooks, React Router, Redux)
              </h1>
              <p className="text-gray-3 font-semibold text-sm">
                Academind by Maximilian Schwarzmüller
              </p>
            </div>
          </div>

          <div className="bg-gray-1 rounded-md max-w-md">
            <img
              src="/images/reactCourse.jpg"
              alt="Course"
              className="rounded-tl-md rounded-tr-md"
            />
            <div className="p-3">
              <h1 className="font-semibold">
                React - The Complete Guide (incl Hooks, React Router, Redux)
              </h1>
              <p className="text-gray-3 font-semibold text-sm">
                Academind by Maximilian Schwarzmüller
              </p>
            </div>
          </div>

          <div className="bg-gray-1 rounded-md max-w-md">
            <img
              src="/images/reactCourse.jpg"
              alt="Course"
              className="rounded-tl-md rounded-tr-md"
            />
            <div className="p-3">
              <h1 className="font-semibold">
                React - The Complete Guide (incl Hooks, React Router, Redux)
              </h1>
              <p className="text-gray-3 font-semibold text-sm">
                Academind by Maximilian Schwarzmüller
              </p>
            </div>
          </div>

          <div className="bg-gray-1 rounded-md max-w-md">
            <img
              src="/images/reactCourse.jpg"
              alt="Course"
              className="rounded-tl-md rounded-tr-md"
            />
            <div className="p-3">
              <h1 className="font-semibold">
                React - The Complete Guide (incl Hooks, React Router, Redux)
              </h1>
              <p className="text-gray-3 font-semibold text-sm">
                Academind by Maximilian Schwarzmüller
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-xl font-semibold my-5 w-full max2xl:w-5/6 mx-auto">
          Topics recommended for you
        </h1>

        <div className="grid grid-cols-4 w-full max2xl:w-5/6 m-auto maxlg:grid-cols-2 gap-5 justify-between">
          <button className="bg-gray-1 px-5 py-3 w-full rounded-md">
            Javascript
          </button>
          <button className="bg-gray-1 px-5 py-3 w-full rounded-md">
            Javascript
          </button>
          <button className="bg-gray-1 px-5 py-3 w-full rounded-md">
            Javascript
          </button>
          <button className="bg-gray-1 px-5 py-3 w-full rounded-md">
            Javascript
          </button>
        </div>
      </div>
    </Layout>
  )
}

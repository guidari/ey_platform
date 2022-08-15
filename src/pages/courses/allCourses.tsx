import { useContext, useState } from "react"
import Layout from "../../components/Layout"

import { useQuery } from "react-query"
import CourseBox from "../../components/Courses/CourseBox"
import Spinner from "../../components/Spinner"
import { UserContext } from "../../context/userContext"
import { ICourse } from "../../interface/ICourse"
import { ICourses } from "../../interface/ICourses"
import NotAuthorized from "../notAuthorized"

export default function Page() {
  const userContext = useContext(UserContext)

  if (!userContext) {
    return <NotAuthorized />
  }

  const [courses, setCourses] = useState<any>()

  const { data, isLoading, error } = useQuery("courses", async () => {
    // // const response = await fetch(
    // //   "https://calm-refuge-90714.herokuapp.com/courses"
    // // )
    const response = await fetch(process.env.NEXT_PUBLIC_NODE_API + "courses")
    const data: ICourses = await response.json()

    const courses = data.results.map((course: ICourse) => {
      return {
        id: course.id,
        title: course.title,
        curriculum_items: course.curriculum_items,
        curriculum_lectures: course.curriculum_lectures,
        headline: course.headline,
        url: course.url,
        image_125_H: course.image_125_H,
        image_240x135: course.image_240x135,
        image_480x270: course.image_480x270,
        visible_instructors: course.visible_instructors,
      }
    })
    setCourses(courses)
    console.log("data", data)

    return courses
  })

  function searchCourse(event: any) {
    const value = event.target.value
    console.log(value)

    fetch(process.env.NEXT_PUBLIC_NODE_API + "search", {
      // fetch("https://calm-refuge-90714.herokuapp.com/search", {
      method: "GET",
      headers: { name: value },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("courses search", data)
        const courses = data.results.map((course: ICourse) => {
          return {
            id: course.id,
            title: course.title,
            curriculum_items: course.curriculum_items,
            curriculum_lectures: course.curriculum_lectures,
            headline: course.headline,
            url: course.url,
            image_125_H: course.image_125_H,
            image_240x135: course.image_240x135,
            image_480x270: course.image_480x270,
            visible_instructors: course.visible_instructors,
          }
        })
        setCourses(courses)
        // mountCoursesSection()
      })
  }

  console.log("courses", courses)
  // const mountCoursesSection = () => {
  //   console.log("courses", courses.results)
  //   let coursesList = ""
  //   courses.results.forEach((course: ICourse) => {
  //     coursesList += `
  //     ${course.title} <br>
  //   `
  //     document.querySelector("#coursesList")!.innerHTML = coursesList
  //   })
  // }

  return (
    <Layout>
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <div className="flex border-1 w-3/6 rounded-md place-items-center h-10 bg-gray-1 maxsm:w-5/6 maxxl:mx-auto maxxl:w-5/6  maxmd:w-4/6 maxxl:mb-5">
          <span className="bg-gray-1 rounded-tl rounded-bl pl-1">
            <svg
              className="w-7 h-7 py-1"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
            </svg>
          </span>

          <input
            type="text"
            id="course"
            className="px-2 w-full bg-gray-1 rounded-tr rounded-br focus:outline-none"
            placeholder="Search..."
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                searchCourse(event)
              }
            }}
          />
        </div>

        <div className="grid grid-cols-4 max2xl:w-5/6 m-auto maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <h1>Error</h1>
          ) : (
            <>
              <CourseBox coursesData={courses} numberCourses={12} />
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

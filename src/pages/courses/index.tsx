import Layout from "../../components/layout"
import GrayBox from "../../components/GrayBox/grayBox"
import CourseBox from "../../components/Courses/CourseBox"
import ButtonTopics from "../../components/Courses/ButtonTopics"
import { SearchBar } from "../../components/Courses/SearchBar"

import { DesktopComputerIcon } from "@heroicons/react/outline"
import { useQuery } from "react-query"
import Spinner from "../../components/Spinner"
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
  url: string
  id: number
  image_125_H: string
  image_240x135: string
  image_480x270: string
  title: string
  visible_instructors: Array<any>
}

export default function Page() {
  // let courses: ICourses

  // Recommended for you
  const { data, isLoading, error, refetch } = useQuery("courses", async () => {
    // const response = await fetch(
    //   "https://calm-refuge-90714.herokuapp.com/courses"
    // )
    const response = await fetch("http://localhost:3333/courses")
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

    return courses
  })

  // fetch("http://localhost:3333/search", {
  //   method: "GET",
  //   headers: { name: "java" },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     courses = data
  //     console.log("data", data)
  //     // mountCoursesSection()
  //   })

  // const mountCoursesSection = () => {
  //   console.log("courses", courses.results)
  // let coursesList = ""

  // courses.results.forEach((course: ICourse) => {
  //   coursesList += `
  //     ${course.title} <br>
  //   `

  //   document.querySelector("#coursesList")!.innerHTML = coursesList
  // })
  // }

  // If no session exists, display access denied message

  // If session exists, display content
  return (
    <Layout>
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <SearchBar />
        <GrayBox title="My Progress" size="full">
          <div className="grid grid-cols-4 maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between px-5 maxmd:px-0 py-2">
            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">11</h1>
                <h2 className="text-lg maxmd:text-md font-semibold">
                  Completed courses
                </h2>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">11</h1>
                <h2 className="text-lg font-semibold">Completed courses</h2>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">11</h1>
                <h2 className="text-lg font-semibold">
                  Hours Completed this year
                </h2>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">11</h1>
                <h2 className="text-lg font-semibold">Completed Challenges</h2>
              </div>
            </div>
          </div>
        </GrayBox>
        <h1 className="text-xl font-semibold my-5 w-full max2xl:w-5/6 mx-auto">
          Recommended for you
        </h1>
        <div className="grid grid-cols-4 max2xl:w-5/6 m-auto maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between">
          {/* <CourseBox
            title="React - The Complete Guide (incl Hooks, React Router, Redux)"
            professor="Academind by Maximilian Schwarzmüller"
          />
          <CourseBox
            title="React - The Complete Guide (incl Hooks, React Router, Redux)"
            professor="Academind by Maximilian Schwarzmüller"
          />
          <CourseBox
            title="React - The Complete Guide (incl Hooks, React Router, Redux)"
            professor="Academind by Maximilian Schwarzmüller"
          />
          <CourseBox
            title="React - The Complete Guide (incl Hooks, React Router, Redux)"
            professor="Academind by Maximilian Schwarzmüller"
          /> */}

          {isLoading ? (
            <Spinner />
          ) : error ? (
            <h1>Error</h1>
          ) : (
            <>
              <CourseBox coursesData={data} />
              {/* {data?.results} */}
            </>
          )}

          {/* {courses.results.map((course) => {})} */}
        </div>
        <h1 className="text-xl font-semibold my-5 w-full max2xl:w-5/6 mx-auto">
          Topics recommended for you
        </h1>
        <div className="grid grid-cols-4 w-full max2xl:w-5/6 m-auto maxlg:grid-cols-2 gap-5 justify-between">
          <ButtonTopics title="Javascript" />
          <ButtonTopics title="Java" />
          <ButtonTopics title="React" />
          <ButtonTopics title="Node" />
        </div>
      </div>
    </Layout>
  )
}

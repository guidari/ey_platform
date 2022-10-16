import ButtonTopics from "../../components/Courses/ButtonTopics"
import CourseBox from "../../components/Courses/CourseBox"
import Layout from "../../components/Layout"

import { CircularProgress } from "@mui/material"
import Link from "next/link"
import { useContext, useState } from "react"
import { useQuery } from "react-query"
import UserProgress from "../../components/Courses/UserProgress"
import Spinner from "../../components/Spinner"
import { UserContext } from "../../context/userContext"
import { ICourse } from "../../interface/ICourse"
import { ICourses } from "../../interface/ICourses"

export default function Page() {
  const userContext = useContext(UserContext)
  console.log("userContext")
  const [tech, setTech] = useState(
    userContext?.skills[0] ? userContext?.skills[0] : "javascript"
  )
  const [loading, setLoading] = useState(false)

  // Recommended for you
  const { data, isLoading, error, refetch } = useQuery("courses", async () => {
    // const response = await fetch(process.env.NEXT_PUBLIC_NODE_API + "courses") // Not wokrking for now

    const response = await fetch(process.env.NEXT_PUBLIC_NODE_API + "search", {
      method: "GET",
      headers: { name: tech, language: "English" },
    })
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
    setLoading(false)
    return courses
  })

  const newSkill = (event: any) => {
    console.log("event", event.target.value)
    setTech(event.target.value)
    setTimeout(() => {
      refetch()
    }, 100)
  }

  // If session exists, display content
  return (
    <Layout>
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <UserProgress />

        {userContext && (
          <div className="my-5 w-full max2xl:w-5/6 mx-auto flex justify-between place-items-center">
            <div className="flex gap-5 place-items-center">
              <h1 className="text-xl font-semibold ">
                Find a course based on your skills
              </h1>

              <select
                name="skill"
                id="skill"
                className="rounded-lg bg-gray-1 px-4 py-3  mt-2 mb-5 text-sm w-40 focus:outline-none"
                onChange={(event) => {
                  setLoading(true)
                  newSkill(event)
                }}
              >
                {userContext?.skills.map((item: any) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                })}
              </select>
              {loading && (
                <CircularProgress sx={{ color: "var(--yellow-1)" }} />
              )}
            </div>
            <div className="w-60">
              <Link href="/courses/myCourses">
                <a className="cursor-pointer float-right bg-yellow-1 text-black w-100 px-3 py-2 rounded-md text-sm font-medium text-center ease-out duration-300 hover:opacity-80">
                  My Courses
                </a>
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 max2xl:w-5/6 m-auto maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <h1>Error</h1>
          ) : (
            <>
              <CourseBox coursesData={data} numberCourses={8} />
              <Link href="/courses/allCourses">
                <a className="cursor-pointer bg-yellow-1 text-black w-3/6 px-3 py-2 rounded-md text-sm font-medium text-center ease-out duration-300 hover:opacity-80">
                  More Courses
                </a>
              </Link>

              {/* {data?.results} */}
            </>
          )}

          {/* {courses.results.map((course) => {})} */}
        </div>
        <h1 className="text-xl font-semibold my-5 w-full max2xl:w-5/6 mx-auto">
          Recommended topics for you
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

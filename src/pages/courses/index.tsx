import ButtonTopics from "../../components/Courses/ButtonTopics"
import CourseBox from "../../components/Courses/CourseBox"
import GrayBox from "../../components/GrayBox/grayBox"
import Layout from "../../components/Layout"

import { DesktopComputerIcon } from "@heroicons/react/outline"
import { useContext } from "react"
import { useQuery } from "react-query"
import Spinner from "../../components/Spinner"
import { UserContext } from "../../context/userContext"
import { ICourse } from "../../interface/ICourse"
import { ICourses } from "../../interface/ICourses"

export default function Page() {
  const userContext = useContext(UserContext)

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

  // If session exists, display content
  return (
    <Layout>
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <GrayBox title="My Progress" size="full">
          <div className="grid grid-cols-4 maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between px-5 maxmd:px-0 py-2">
            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">
                  {userContext?.progress.enrolledCourses}
                </h1>
                <h2 className="text-lg maxmd:text-md font-semibold">
                  Enrolled courses
                </h2>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">
                  {userContext?.progress.completedCourses}
                </h1>
                <h2 className="text-lg font-semibold">Completed courses</h2>
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">
                  {userContext?.progress.hours}
                </h1>
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
                <h1 className="text-2xl font-semibold">
                  {userContext?.progress.challenges}
                </h1>
                <h2 className="text-lg font-semibold">Completed Challenges</h2>
              </div>
            </div>
          </div>
        </GrayBox>
        <div className="my-5 w-full max2xl:w-5/6 mx-auto flex justify-between place-items-center">
          <h1 className="text-xl font-semibold ">Recommended for you</h1>
          <div className="w-60">
            <a
              href="/courses/myCourses"
              className="cursor-pointer float-right bg-yellow-1 text-black w-100 px-3 py-2 rounded-md text-sm font-medium text-center ease-out duration-300 hover:opacity-80"
            >
              My Courses
            </a>
          </div>
        </div>

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
              <CourseBox coursesData={data} numberCourses={4} />
              <a
                href="/courses/allCourses"
                className="cursor-pointer bg-yellow-1 text-black w-3/6 px-3 py-2 rounded-md text-sm font-medium text-center ease-out duration-300 hover:opacity-80"
              >
                More Courses
              </a>

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

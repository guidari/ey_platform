import { useContext, useState } from "react"
import { useQuery } from "react-query"
import Layout from "../../components/Layout"
import { UserContext } from "../../context/userContext"
import { ICourses } from "../../interface/ICourses"
import NotAuthorized from "../notAuthorized"

export default function Page() {
  const userContext = useContext(UserContext)

  if (!userContext) {
    return <NotAuthorized />
  }

  const [myCourses, setMyCourses] = useState<any>()

  console.log("userContext?.enrolledCourses", userContext?.enrolledCourses)

  const { data, isLoading, error, refetch } = useQuery(
    "myCourses",
    async () => {
      let myCoursesArray: any = []
      userContext?.enrolledCourses.forEach(async (id) => {
        const response = await fetch(
          process.env.NEXT_PUBLIC_NODE_API + "mycourses",
          {
            method: "GET",
            headers: { id: id },
          }
        )
        const data: ICourses = await response.json()
        console.log("data", data)
        setMyCourses(data)
        myCoursesArray.push(data)
      })
      // const response = await fetch(
      //   "https://calm-refuge-90714.herokuapp.com/courses"
      // )

      // const courses = data.results.map((course: ICourse) => {
      //   return {
      //     id: course.id,
      //     title: course.title,
      //     curriculum_items: course.curriculum_items,
      //     curriculum_lectures: course.curriculum_lectures,
      //     headline: course.headline,
      //     url: course.url,
      //     image_125_H: course.image_125_H,
      //     image_240x135: course.image_240x135,
      //     image_480x270: course.image_480x270,
      //     visible_instructors: course.visible_instructors,
      //   }
      // })

      return myCoursesArray
    }
  )

  console.log("data", data)

  return (
    <Layout>
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <h1 className="text-xl font-semibold">My Courses</h1>
        <div className="grid grid-cols-4 max2xl:w-5/6 m-auto maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between">
          {/* <CourseBox coursesData={myCourses} numberCourses={4} /> */}
        </div>
      </div>
    </Layout>
  )
}

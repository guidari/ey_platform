import { useEffect, useState } from "react"
import { ICourses } from "../../interface/ICourses"
import CourseBox from "../Courses/CourseBox"
import Spinner from "../Spinner"

export default function JobCourses({ skills }: any) {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const getCourses = async () => {
    setLoading(true)

    const allCourses = []

    for (let index = 0; index < skills?.length; index++) {
      const element = skills[index]
      const response = await fetch(
        process.env.NEXT_PUBLIC_NODE_API + "search",
        {
          method: "GET",
          headers: { name: element, language: "English" },
        }
      )
      const data: ICourses = await response.json()

      allCourses.push(data.results[0])
    }
    setCourses(allCourses)
  }

  useEffect(() => {
    getCourses()
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [skills])
  console.log("courses", courses)
  return (
    <div className="mt-3">
      <h1 className="text-3xl mb-3">Courses related to this job role</h1>
      {loading && <Spinner />}
      {courses && (
        <div className="grid grid-cols-3 max2xl:w-5/6 m-auto maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between">
          <CourseBox coursesData={courses} numberCourses={12} />
        </div>
      )}
      {/* {courses.length === 0 && (
        <p>There are no recommended courses for this job role</p>
      )} */}
    </div>
  )
}

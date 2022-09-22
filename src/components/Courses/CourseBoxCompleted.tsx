import { useContext } from "react"
import { UserContext } from "../../context/userContext"

export default function CourseBoxCompleted({
  coursesData,
  numberCourses,
}: any) {
  const userContext = useContext(UserContext)

  return (
    <>
      {coursesData.slice(0, numberCourses).map((course: any) => {
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
                {course.visible_instructors.map((instructor: any) => {
                  return instructor.title
                })}
              </p>
            </div>
          </div>
        )
      })}
    </>
  )
}

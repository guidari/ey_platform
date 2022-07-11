export default function CourseBox({ coursesData, numberCourses }) {
  return (
    <>
      {coursesData.slice(0, numberCourses).map((course) => {
        return (
          <div key={course.id} className="bg-gray-1 rounded-md max-w-md">
            <img
              src={course.image_480x270}
              alt="Course"
              className="rounded-tl-md rounded-tr-md"
            />
            <div className="p-3">
              <h1 className="font-semibold">{course.title}</h1>
              <p className="my-1 text-gray-3 font-semibold text-sm">
                {course.visible_instructors.map((instructor) => {
                  return instructor.title
                })}
              </p>
              <div className="my-2 flex gap-5">
                <a
                  href={"https://www.udemy.com" + course.url}
                  target="_blank"
                  className="cursor-pointer bg-yellow-1 text-black px-3 py-2 rounded-md text-sm font-medium"
                >
                  Learn more
                </a>
                <a className=" cursor-pointer bg-yellow-1 text-black px-3 py-2 rounded-md text-sm font-medium">
                  Enroll
                </a>
              </div>
            </div>
          </div>
        )
      })}
      <a
        href="/allCourses"
        className="cursor-pointer bg-yellow-1 text-black w-3/6 px-3 py-2 rounded-md text-sm font-medium text-center"
      >
        More Courses
      </a>
    </>
  )
}

export default function ButtonTopics({ title }) {
  // const getCourseClicked = () => {
  //   const btnValue = document.getElementById("btn-course").value
  //   fetch("http://localhost:3333/search", {
  //     method: "GET",
  //     headers: { name: btnValue },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("data", data)
  //       // mountCoursesSection()
  //     })
  // }

  return (
    <a
      id="btn-course"
      href={"https://www.udemy.com/courses/search/?src=ukw&q=" + title}
      target="_blank"
      className="bg-gray-1 px-5 py-3 w-full rounded-md text-center text-lg font-semibold"
      // onClick={getCourseClicked}
      value={title}
    >
      {title}
    </a>
  )
}

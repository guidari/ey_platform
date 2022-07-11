export default function ButtonTopics({ title }) {
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

import Layout from "../../components/layout"

export default function Page() {
  function searchCourse(event: any) {
    const value = event.target.value
    console.log(value)
  }

  return (
    <Layout>
      <div className="flex border-1 rounded-md mx-2 place-items-center h-8 bg-gray-1 maxmd:hidden">
        <span className="bg-gray-1 rounded-tl rounded-bl pl-1">
          <svg
            className="w-6 h-6 py-1"
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
          className="px-4 w-80 maxlg:w-60  bg-gray-1 rounded-tr rounded-br focus:outline-none"
          placeholder="Search a course"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              searchCourse(event)
            }
          }}
        />
      </div>
    </Layout>
  )
}

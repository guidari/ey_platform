import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import CourseBox from "../../components/Courses/CourseBox"
import Layout from "../../components/Layout"
import { UserContext } from "../../context/userContext"
import { ICourses } from "../../interface/ICourses"
import NotAuthorized from "../notAuthorized"
import axios from "axios"
import Link from "next/link"

export default function Page() {
  const userContext = useContext(UserContext)

  const [myCourses, setMyCourses] = useState<string[]>([])

  const user = userContext

  useEffect(() => {
    let tokenHeaders
    userContext?.enrolledCourses.map((item) => {
      console.log("item id", item)
      tokenHeaders = {
        headers: {
          id: item,
        },
      }
      axios
        .get(process.env.NEXT_PUBLIC_NODE_API + "mycourses", tokenHeaders)
        .then(function (response) {
          setMyCourses((current: string[]) => [...current, ...[response.data]])
        })
    })
  }, [user])

  console.log("myCourses", myCourses)

  return (
    <Layout>
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <h1 className="text-xl font-semibold">My Courses</h1>
        {!userContext && (
          <div>
            <Link href="/login">
              <span
                style={{
                  color: "#FFE600",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Sign in
              </span>
            </Link>{" "}
            to see the courses you had enrolled
          </div>
        )}
        {userContext && (
          <div className="grid grid-cols-4 max2xl:w-5/6 m-auto maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between">
            <CourseBox coursesData={myCourses} numberCourses={12} />
          </div>
        )}
      </div>
    </Layout>
  )
}

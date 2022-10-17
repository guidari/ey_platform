import { collection, getDocs, query } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { SearchBar } from "../../components/Courses/SearchBar"
import JobBox from "../../components/Jobs/JobBox"
import Layout from "../../components/Layout"
import RecommendJobs from "../../components/Profile/RecommendJobs"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import { IJobBox } from "../../interface/IJobBox"

export default function Page() {
  const userContext = useContext(UserContext)
  const [jobs, setJobs] = useState<IJobBox[]>([])

  const getJobs = async () => {
    const docRef = collection(db, "jobs")

    const q = query(docRef)

    const querySnapshot = await getDocs(q)
    let allJobs: any = []
    querySnapshot.forEach((doc) => {
      allJobs.push(doc.data())
    })
    setJobs(allJobs)
    console.log("allJobs", allJobs)
  }

  useEffect(() => {
    getJobs()
  }, [])

  return (
    <Layout>
      <div className="w-full bg-gray-1 py-5">
        <div className="w-5/6 m-auto max-w-screen-xl py-5">
          <h1 className="text-xl font-semibold">
            Browse through our opportunities
          </h1>
          <div className="grid grid-cols-3 maxxl:grid-cols-2 maxmd:grid-cols-1">
            <SearchBar title="Search by key word" />
            <SearchBar title="Filter by technology" />
            <SearchBar title="Filter by category" />
          </div>
        </div>
      </div>
      <div className="w-5/6 m-auto max-w-screen-xl">
        <div className="grid grid-cols-3 maxxl:grid-cols-2 maxmd:grid-cols-1">
          {jobs.map((job) => {
            return (
              <JobBox
                id={job.id}
                title={job.title}
                description={job.description}
                location={job.location}
                skills={job.skills}
              />
            )
          })}
        </div>

        {userContext ? (
          <>
            <h2 className="text-xl font-semibold mt-5">
              Jobs based on your skills
            </h2>
            <div className="grid grid-cols-3 maxxl:grid-cols-2 maxmd:grid-cols-1">
              <RecommendJobs />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </Layout>
  )
}

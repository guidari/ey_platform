import { collection, getDocs, query, where } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { SearchBar } from "../../components/Courses/SearchBar"
import JobBox from "../../components/Jobs/JobBox"
import RecommendJobs from "../../components/Jobs/RecommendJobs"
import Layout from "../../components/Layout"
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

  // const searchByKeyWord = async (e: any) => {
  //   if (e.target.value === "") {
  //     return getJobs()
  //   }
  //   console.log("searchByKeyWord", e.target.value)
  //   const q = query(
  //     collection(db, "jobs"),
  //     where("description", "==", e.target.value)
  //   )

  //   const array: any = []
  //   const querySnapshot = await getDocs(q)
  //   querySnapshot.forEach((doc) => {
  //     console.log("doc", doc)
  //     array.push(doc.data())
  //   })
  //   setJobs(array)
  // }

  const searchByTech = async (e: any) => {
    if (e.target.value === "") {
      return getJobs()
    }
    const q = query(
      collection(db, "jobs"),
      where("skills", "array-contains-any", [e.target.value])
    )

    const array: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log("doc", doc)
      array.push(doc.data())
    })
    setJobs(array)
  }

  const searchByLocation = async (e: any) => {
    if (e.target.value === "") {
      return getJobs()
    }
    const q = query(
      collection(db, "jobs"),
      where("location", "==", e.target.value)
    )

    const array: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log("doc", doc)
      array.push(doc.data())
    })
    setJobs(array)
  }

  return (
    <Layout>
      <div className="w-full bg-gray-1 py-5">
        <div className="w-5/6 m-auto max-w-screen-xl py-5">
          <h1 className="text-xl font-semibold">
            Browse through our opportunities
          </h1>
          <div className="grid grid-cols-3 maxxl:grid-cols-2 maxmd:grid-cols-1">
            {/* <SearchBar
              title="Search by key word"
              id="keyWord"
              // eventFunction={(e: any) => searchByKeyWord(e)}
              onKeyPress={(event: any) => {
                if (event.key === "Enter") {
                  searchByKeyWord(event)
                }
              }}
            /> */}
            <SearchBar
              title="Filter by technology"
              id="tech"
              onKeyPress={(event: any) => {
                if (event.key === "Enter") {
                  searchByTech(event)
                }
              }}
            />
            <SearchBar
              title="Filter by location"
              id="location"
              onKeyPress={(event: any) => {
                if (event.key === "Enter") {
                  searchByLocation(event)
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-5/6 m-auto max-w-screen-xl">
        <h2 className="text-xl font-semibold mt-5">All jobs</h2>
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

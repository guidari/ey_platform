import { collection, getDocs, query, where } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import { IJobBox } from "../../interface/IJobBox"
import JobBox from "./JobBox"

export default function RecommendJobs() {
  const userContext = useContext(UserContext)
  const [jobs, setJobs] = useState<IJobBox[]>([])

  const fetchJob = async () => {
    const q = query(
      collection(db, "jobs"),
      where("skills", "array-contains-any", userContext?.skills)
    )

    const array: any = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log("doc", doc)
      array.push(doc.data())
    })
    setJobs(array)
  }

  useEffect(() => {
    fetchJob()
  }, [])

  return (
    <>
      {jobs.length > 0 ? (
        jobs.map((job) => {
          return (
            <JobBox
              id={job.id}
              title={job.title}
              description={job.description}
              location={job.location}
              skills={job.skills}
            />
          )
        })
      ) : (
        <p>Fill your profile skills to have a better experience</p>
      )}
    </>
  )
}

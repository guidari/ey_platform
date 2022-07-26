import UserRank from "../../components/Challenge/UserRank"
import Layout from "../../components/Layout"
import NotionChallenge from "../../components/Challenge/NotionChallenge"

import { collection, DocumentData, getDocs } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"

export default function Page() {
  const [users, setUsers] = useState<DocumentData>()

  async function getAllUsers() {
    const docRef = collection(db, "users")
    console.log("docRef", docRef)
    const docSnap = await getDocs(docRef)

    setUsers(docSnap)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <Layout>
      <div className="w-5/6 m-auto max-w-screen-xl">
        <div className="flex maxxl:flex-col gap-5  pt-5">
          <NotionChallenge />

          <div className="flex-initial w-3/6 maxxl:w-full p-5 bg-gray-1 rounded-md mt-5">
            <h1 className="text-xl font-semibold mb-5">Global Rank 🏆</h1>
            <UserRank name="Sana Minatozaki" solvedChallenges={14} />

            {!users ? (
              <Spinner />
            ) : (
              users.forEach((item: any) => {
                // <UserRank
                //   name={item.data().name}
                //   solvedChallenges={item.data().progress.challenges}
                // />

                return item.data().name
              })
            )}

            {!users ? (
              <Spinner />
            ) : (
              console.log(
                "docSnap",
                users?.forEach((item: any) => console.log(item.data()))
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

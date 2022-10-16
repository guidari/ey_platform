import Layout from "../../components/Layout"

import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import UserRank from "../../components/Challenge/UserRank"
import WeekChallenge from "../../components/Challenge/WeekChallenge"
import { db } from "../../config/firebase"
import { IUser } from "../../interface/IUser"

export default function Page() {
  const [users, setUsers] = useState<any[]>([])

  async function getAllUsers() {
    const docRef = collection(db, "users")

    const docSnap = await getDocs(docRef)
    const q = query(docRef, orderBy("progress.challenges", "desc"))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setUsers((current: string[]) => [...current, ...[doc.data()]])
    })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <Layout>
      <div className="w-5/6 m-auto max-w-screen-xl">
        <div className="flex maxxl:flex-col gap-5  pt-5">
          {/* <NotionChallenge /> */}
          <WeekChallenge />

          <div className="flex-initial w-3/6 maxxl:w-full p-5 bg-gray-1 rounded-md mt-5">
            <>
              <h1 className="text-xl font-semibold mb-5">
                Week Challenge Rank 🏆
              </h1>
              {/* <UserRank name="Sana Minatozaki" solvedChallenges={14} /> */}
              {/* {users?.forEach((user: any) => {
              ;<>
                <UserRank
                  key={user.data().id}
                  name={user.data().name}
                  solvedChallenges={user.data().progress.challenges}
                />
              </>
            })} */}
              {users.map((user: IUser) => {
                return (
                  <UserRank
                    image={user.image}
                    key={user.id}
                    name={user.name}
                    solvedChallenges={user.weekChallenge}
                  />
                )
              })}
              {console.log("users", users)}
              {/* <div id="globalRank"></div> */}
            </>
          </div>
        </div>
      </div>
    </Layout>
  )
}

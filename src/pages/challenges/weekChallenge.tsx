import Layout from "../../components/Layout"

import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import UserRank from "../../components/Challenge/UserRank"
import WeekChallenge from "../../components/Challenge/WeekChallenge"
import { db } from "../../config/firebase"

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

    console.log("docSnap", docSnap)

    // let globalRank = ""

    // if (docSnap.size > 0) {
    //   docSnap.forEach((item) => {
    //     globalRank += `
    //     <div class="flex gap-3 mb-5">
    //       <div>
    //         <img src=${
    //           item.data().image == ""
    //             ? `/images/userGeneric.png`
    //             : item.data().image
    //         } alt="User" class="rounded-full w-12" />
    //       </div>

    //       <div>
    //         <h3 class="text-md font-semibold">${item.data().name}</h3>
    //         <p class="text-sm">
    //           Solved challenges:
    //           <span class="text-yellow-1"> ${
    //             item.data().progress.challenges
    //           }</span>
    //         </p>
    //       </div>
    //     </div>`
    //   })
    //   document.querySelector("#globalRank")!.innerHTML = globalRank
    // } else {
    //   document.querySelector("#globalRank")!.innerHTML = "No users found"
    // }
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
              <h1 className="text-xl font-semibold mb-5">Global Rank 🏆</h1>
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
              {users.map((user) => {
                return (
                  <UserRank
                    image={user.image}
                    key={user.id}
                    name={user.name}
                    solvedChallenges={user.progress.challenges}
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

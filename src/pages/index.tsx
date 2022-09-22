import { useAuthState } from "react-firebase-hooks/auth"

import { useContext } from "react"

import { getAuth } from "firebase/auth"
import { UserContext } from "../context/userContext"

export default function Page() {
  const userContext = useContext(UserContext)

  const auth = getAuth()

  const [user, loading, error] = useAuthState(auth)

  return (
    <>
      {/* {user && (
        <div className="w-4/6 maxxl:w-5/6 m-auto">
          <h1 className="text-xl font-semibold mt-5">
            Welcome back {userContext?.name}!
          </h1>
        </div>
      )}
      <div className="flex gap-5 w-4/6 maxxl:w-5/6 maxlg:inline m-auto pt-5">
        <h2>teste</h2>
      </div> */}
      <div className="">
        <h2>oi</h2>
      </div>
    </>
  )
}

import Layout from "../components/layout"
import { db } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { query, where, collection, getDocs } from "firebase/firestore"
import GrayBox from "../components/GrayBox/grayBox"
import { useEffect, useState } from "react"

import router from "next/router"
import { getAuth } from "firebase/auth"

export default function Page() {
  const auth = getAuth()

  const [user, loading, error] = useAuthState(auth)
  const [userData, setUserData] = useState<any>([])

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("id", "==", user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
      setUserData(data)
    } catch (err) {
      console.log("User not authenticated")
    }
  }

  useEffect((): any => {
    if (loading) return
    if (!user) return router.push("/")
    fetchUserName()
  }, [user, loading])

  console.log("userData", userData)

  return (
    <Layout>
      {user && (
        <div className="w-4/6 maxxl:w-5/6 m-auto">
          <h1 className="text-xl font-semibold mt-5">
            Welcome back {userData.name}!
          </h1>
        </div>
      )}

      <div className="flex gap-5 w-4/6 maxxl:w-5/6 maxlg:inline m-auto pt-5">
        <div id="column1" className="flex justify-center w-full">
          <GrayBox title="Courses" size="full">
            <p className="mb-5 font-semibold">
              Based on your skills we recommend these courses bellow to improve
              your skills and get ready to work with us
            </p>
            <div className="flex gap-5">
              <div>
                <a
                  href="https://www.udemy.com/course/react-the-complete-guide-incl-redux/"
                  target="_blank"
                >
                  <img width="300px" src="/images/reactCourse.jpg" alt="" />
                </a>
              </div>
              <div>
                <h1 className="font-semibold">
                  React - The Complete Guide (incl Hooks, React Router, Redux)
                </h1>
                <p className="my-3">
                  Dive in and learn React.js from scratch! Learn Reactjs, Hooks,
                  Redux, React Routing, Animations, Next.js and way more!
                </p>
                <p className="text-gray-4">
                  <a
                    href="https://www.udemy.com/user/academind/"
                    target="_blank"
                  >
                    Academind by Maximilian Schwarzmüller
                  </a>
                </p>
              </div>
            </div>
          </GrayBox>
        </div>
        <div id="column2" className="flex justify-center w-3/6 maxlg:w-full">
          <GrayBox title="My Porgress" size="full">
            <h1>oi</h1>
          </GrayBox>
        </div>
      </div>
    </Layout>
  )
}

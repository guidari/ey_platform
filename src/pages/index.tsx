import Layout from "../components/Layout"
import { useAuthState } from "react-firebase-hooks/auth"

import GrayBox from "../components/GrayBox/grayBox"
import { useContext, useEffect, useState } from "react"

import { getAuth } from "firebase/auth"
import { UserContext } from "../context/userContext"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { stringify } from "querystring"

export default function Page() {
  const userContext = useContext(UserContext)

  const auth = getAuth()

  const [user, loading, error] = useAuthState(auth)

  // const [date, setDate] = useState<Number>()

  // let updatedEycoin

  // const dateNow = new Date()
  // const day = dateNow.getDate()

  // const getDay = window.localStorage.getItem("date")

  // !userContext ? console.log("Carregando") : addDailyEyCoin()

  // function addDailyEyCoin() {
  //   if (getDay == JSON.stringify(day)) {
  //     console.log("Not able to get the daily coin")
  //   }
  //   updatedEycoin = userContext!.eycoin + 1

  //   setDate(day)
  //   window.localStorage.setItem("date", `${day}`)

  //   updateDoc(doc(db, `users/${userContext?.id}`), {
  //     eycoin: updatedEycoin,
  //   })

  //   alert("You earned 1 EYCoin due the daily check in")
  // }

  // useEffect(() => {
  //   addDailyEyCoin()
  // }, [])

  // console.log(date)

  return (
    <Layout>
      {user && (
        <div className="w-4/6 maxxl:w-5/6 m-auto">
          <h1 className="text-xl font-semibold mt-5">
            Welcome back {userContext?.name}!
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

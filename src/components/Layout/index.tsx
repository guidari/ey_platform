import { doc, updateDoc } from "firebase/firestore"
import { useContext } from "react"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import DailyCoin from "../dailyCoin"
import Header from "../Header/header"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const userContext = useContext(UserContext)

  const userChallenges = userContext?.progress.challenges! / 25
  const userHours = userContext?.progress.hours! / 25
  const userWeek = userContext?.weekChallenge! / 10

  const userLevel = userChallenges + userHours + userWeek

  if (userContext) {
    updateDoc(doc(db, `users/${userContext?.id}`), {
      userLevel: Math.round(userLevel),
    })
  }

  return (
    <>
      <Header />
      <DailyCoin />

      <main>{children}</main>

      {/* <Footer /> */}
    </>
  )
}

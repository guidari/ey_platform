import { useAuthState } from "react-firebase-hooks/auth"

import { useContext } from "react"

import { useMediaQuery } from "@mui/material"
import { getAuth } from "firebase/auth"
import DailyCoin from "../components/dailyCoin"
import Layout from "../components/Layout"
import { UserContext } from "../context/userContext"

export default function Page() {
  const userContext = useContext(UserContext)
  const matches = useMediaQuery("(min-width:1280px)")

  const auth = getAuth()

  const [user, loading, error] = useAuthState(auth)

  return (
    <Layout>
      <h1>Home</h1>
      <DailyCoin />
    </Layout>
  )
}

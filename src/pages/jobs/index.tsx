import { useContext } from "react"
import Layout from "../../components/Layout"
import { UserContext } from "../../context/userContext"

export default function Page() {
  const userContext = useContext(UserContext)

  return (
    <Layout>
      <h1>Jobs</h1>
      <p>{userContext?.email}</p>
    </Layout>
  )
}

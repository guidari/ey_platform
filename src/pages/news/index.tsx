import { useContext } from "react"
import Layout from "../../components/Layout"
import { UserContext } from "../../context/userContext"

export default function News() {
  const userContext = useContext(UserContext)

  return (
    <Layout>
      <h1>News</h1>
    </Layout>
  )
}

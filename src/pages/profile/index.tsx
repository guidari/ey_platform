import Layout from "../../components/layout"
import { useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"
import { app, db } from "../../../config/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function Page() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  if (typeof window !== "undefined" && loading) return null

  async function test() {
    const docRef = doc(db, "Users", "5AcZ6cE2gHryD9DjBThD")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  test()

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Profile</h1>
    </Layout>
  )
}

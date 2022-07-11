import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import router from "next/router"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import Layout from "../../components/layout"
import { db } from "../../config/firebase"

export default function Page() {
  const auth = getAuth()

  const [user, loading, error] = useAuthState(auth)
  const [userData, setUserData] = useState<any>([])

  const fetchUserName = async () => {
    // if (typeof window !== "undefined" && loading) return null

    try {
      const q = query(collection(db, "users"), where("id", "==", user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()

      setUserData(data)
    } catch (err) {}
  }

  useEffect((): any => {
    if (loading) return
    if (!user) return router.push("/login")
    fetchUserName()
  }, [user, loading])

  return (
    <Layout>
      <h1>Jobs</h1>
      <p>{userData.email}</p>
    </Layout>
  )
}

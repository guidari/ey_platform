import Layout from "../../components/layout"
import { useSession } from "next-auth/react"
import AccessDenied from "../../components/access-denied"
import { app, db } from "../../../config/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function Page() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  if (typeof window !== "undefined" && loading) return null

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
      <div className="bg-gray-1 p-5">
        <div className="grid gap-4 grid-cols-2 maxlg:grid-cols-1 mx-auto max-w-screen-2xl">
          <section className="flex gap-4 ">
            <img
              src={session.user?.image}
              alt="User profile picture"
              width="170px"
              className="w-170 rounded-md"
            />
            <div>
              <h1 className="text-xl font-bold">{session.user?.name}</h1>
              <p>Application Developer</p>

              <div className="relative inset-y-12 bottom-0 h-16 maxmd:static maxmd:mt-5">
                <p>Vancouver, Canada</p>
                <p>sanaminatozaki@gmail.com</p>
                <p>+82 2 97237-4690</p>
              </div>
            </div>
          </section>

          <section className="max-w-2xl">
            <h1 className="text-xl font-bold">Social Medias</h1>
            <div className="grid grid-cols-4 maxsm:grid-cols-2">
              <span>
                <button className="bg-gray-3 hover:opacity-90 text-white font-bold py-2 px-6 rounded-md inline-flex items-center mt-4">
                  <img className="mr-4" src="/images/github-white.svg" alt="" />
                  <span>Github</span>
                </button>
              </span>
              <span>
                <button className="bg-gray-3 hover:opacity-90 text-white font-bold py-2 px-6 rounded-md inline-flex items-center mt-4">
                  <img className="mr-4" src="/images/github-white.svg" alt="" />
                  <span>Github</span>
                </button>
              </span>
              <span>
                <button className="bg-gray-3 hover:opacity-90 text-white font-bold py-2 px-6 rounded-md inline-flex items-center mt-4">
                  <img className="mr-4" src="/images/github-white.svg" alt="" />
                  <span>Github</span>
                </button>
              </span>
              <span>
                <button className="bg-gray-3 hover:opacity-90 text-white font-bold py-2 px-6 rounded-md inline-flex items-center mt-4">
                  <img className="mr-4" src="/images/github-white.svg" alt="" />
                  <span>Github</span>
                </button>
              </span>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

import { Backdrop, Box, Fade, Modal, useMediaQuery } from "@mui/material"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
import Challenge from "../../components/Challenge/Challenge"
import ListChallenge from "../../components/Challenge/ListChallenge"
import UserRank from "../../components/Challenge/UserRank"
import Layout from "../../components/Layout"
import { db } from "../../config/firebase"
import { IUser } from "../../interface/IUser"

export default function Page() {
  const matches = useMediaQuery("(min-width:1280px)")

  const [users, setUsers] = useState<any[]>([])

  const [open, setOpen] = useState(false)
  const [challenge, setChallenge] = useState()
  const handleClose = () => setOpen(false)

  const viewChallenge = (e: any) => {
    console.log("challengeInfo", e.row)
    setChallenge(e.row)
    setOpen(true)
  }

  async function getAllUsers() {
    const docRef = collection(db, "users")

    const docSnap = await getDocs(docRef)
    const q = query(docRef, orderBy("progress.challenges", "desc"))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setUsers((current: string[]) => [...current, ...[doc.data()]])
    })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <Layout>
      <div className="w-5/6 m-auto max-w-screen-xl">
        <div className="flex maxxl:flex-col gap-5  pt-5">
          <div className="flex-initial w-full p-5 1 rounded-md mt-5">
            <ListChallenge onRowClick={viewChallenge} />
          </div>

          <div className="flex-initial w-3/6 maxxl:w-full p-5 rounded-md mt-5">
            <Link href="challenges/weekChallenge">
              <img
                src="/images/week_challenge.png"
                width={380}
                height={170}
                className="rounded-md cursor-pointer"
                alt="Week challenge image"
              />
            </Link>

            <div className="flex-initial  maxxl:w-full p-5 bg-gray-1 rounded-md mt-5">
              <>
                <h1 className="text-xl font-semibold mb-5">Global Rank 🏆</h1>

                {users.map((user: IUser) => {
                  return (
                    <UserRank
                      image={user.image}
                      key={user.id}
                      name={user.name}
                      solvedChallenges={user.progress.challenges}
                    />
                  )
                })}
              </>
            </div>

            <Box
              sx={{
                bgcolor: "var(--gray-100)",
                boxShadow: "0 2px 3px rgb(0 0 0 / 15%)",
                borderRadius: 2,
                padding: 2,
                height: "fit-content",
                marginTop: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <p className="font-medium text-lg mb-3">Information</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </Box>

              <p>Every week we are going to release a new challenge. </p>
              <p>
                So keep your skills sharp to be the first one to crack the code!
              </p>
            </Box>
          </div>
        </div>
      </div>

      {/* Modal */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          position: "absolute",
          // top: "5%",
          overflow: "scroll",
          display: "block",
          height: "100%",
          zIndex: 99,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: !matches ? "90%" : "60%",
              bgcolor: "var(--gray-300)",
              boxShadow: "0 2px 3px rgb(0 0 0 / 15%)",
              borderRadius: 2,
              padding: 2,
              height: "fit-content",
              overflowY: "scroll",
              maxHeight: "80%",
              zIndex: 1,
            }}
          >
            <Challenge data={challenge} />
          </Box>
        </Fade>
      </Modal>
    </Layout>
  )
}

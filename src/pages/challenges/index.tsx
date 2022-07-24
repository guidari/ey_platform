import { useContext, useEffect, useState } from "react"
import { NotionRenderer } from "react-notion"
import Button from "../../components/Button/Button"
import UserRank from "../../components/Challenge/UserRank"

import { doc, DocumentData, getDoc } from "firebase/firestore"

import { DocumentTextIcon, LockClosedIcon } from "@heroicons/react/outline"
import Image from "next/image"

import ModalSubmitChallenge from "../../components/Modal/ModalSubmitChallenge"
import Layout from "../../components/Layout"
import { db } from "../../config/firebase"
import Spinner from "../../components/Spinner"
import { IChallenge } from "../../interface/IChallenge"
import { UserContext } from "../../context/userContext"

export default function Page() {
  const userContext = useContext(UserContext)

  const [openModalSubmitChallenge, setOpenModalSubmitChallenge] =
    useState(false)

  const [challenge, setChallenge] = useState<IChallenge | DocumentData>()
  const [challengeNotion, setChallengeNotion] = useState<any>()
  const [challengeId, setChallengeId] = useState<any>()

  let colorDisable
  let disabledSubmit

  async function getChallenge() {
    const docRef = doc(db, "challenges", "CYVNxvaeDkVJUJCwE4D1")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = await fetch(docSnap.data().url).then((res) => res.json())
      setChallengeNotion(data)

      setChallengeId(docSnap.id)

      setChallenge(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  useEffect(() => {
    getChallenge()
  }, [])

  return (
    <Layout>
      <div className="w-5/6 m-auto max-w-screen-xl">
        <div className="flex maxxl:flex-col gap-5  pt-5">
          <div className="flex-initial w-full p-5 bg-gray-1 rounded-md mt-5">
            <div className="flex maxsm:grid gap-5 mb-5">
              <Button icon={<DocumentTextIcon className="h-5 w-5" />}>
                Code template
              </Button>
              <Button
                icon={
                  <Image
                    src="/images/github-black.svg"
                    width={20}
                    height={20}
                  />
                }
                onClick={() => {
                  setOpenModalSubmitChallenge(true)
                }}
                {...userContext?.submitedChallenges.map((item) => {
                  if (item == challengeId) {
                    disabledSubmit = true
                    colorDisable = "bg-gray-2"
                  } else {
                  }
                })}
                color={colorDisable}
                disabled={disabledSubmit}
              >
                Submit
              </Button>
              {openModalSubmitChallenge && (
                <ModalSubmitChallenge
                  closeModal={setOpenModalSubmitChallenge}
                  challenge={challenge}
                  challengeId={challengeId}
                />
              )}
              <Button icon={<LockClosedIcon className="h-5 w-5" />}>
                Solution
              </Button>
            </div>
            {!challengeNotion ? (
              <Spinner />
            ) : (
              <NotionRenderer blockMap={challengeNotion} />
            )}
          </div>

          <div className="flex-initial w-3/6 maxxl:w-full p-5 bg-gray-1 rounded-md mt-5">
            <h1 className="text-xl font-semibold mb-5">Global Rank 🏆</h1>
            <UserRank />
            <UserRank />
            <UserRank />
            <UserRank />
            <UserRank />
            <UserRank />
            <UserRank />
            <UserRank />
          </div>
        </div>
      </div>
    </Layout>
  )
}

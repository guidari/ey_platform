import { useContext, useEffect, useState } from "react"
import Button from "../../components/Button/Button"

import { doc, DocumentData, getDoc } from "firebase/firestore"

import { DocumentTextIcon, LockClosedIcon } from "@heroicons/react/outline"
import Image from "next/image"

import axios from "axios"
import ModalSubmitChallenge from "../../components/Modal/ModalSubmitChallenge"
import Spinner from "../../components/Spinner"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import { IChallenge } from "../../interface/IChallenge"

export default function WeekChallenge() {
  const userContext = useContext(UserContext)

  const [openModalSubmitChallenge, setOpenModalSubmitChallenge] =
    useState(false)

  const [challenge, setChallenge] = useState<IChallenge | DocumentData>()
  const [challengeNotion, setChallengeNotion] = useState<any>()
  const [challengeId, setChallengeId] = useState<any>()

  const [notion, setNotion] = useState()

  let colorDisable
  let disabledSubmit
  let disabledSolution = true
  let colorDisableSolution = "bg-gray-1"

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

  axios
    .get(process.env.NEXT_PUBLIC_NODE_API + "jobs")
    .then(function (response) {
      console.log("response", response.data)
      setNotion(response.data.url)
    })
    .catch((err) => {
      console.log("err", err)
    })

  return (
    <div className="flex-initial w-full p-5 bg-gray-1 rounded-md mt-5">
      <div className="flex maxsm:grid gap-5 mb-5">
        <Button icon={<DocumentTextIcon className="h-5 w-5" />}>
          Code template
        </Button>
        {userContext && (
          <Button
            icon={
              <Image src="/images/github-black.svg" width={20} height={20} />
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
        )}

        {openModalSubmitChallenge && (
          <ModalSubmitChallenge
            closeModal={setOpenModalSubmitChallenge}
            challenge={challenge}
            challengeId={challengeId}
          />
        )}
        {userContext && (
          <Button
            icon={<LockClosedIcon className="h-5 w-5" />}
            {...userContext?.submitedChallenges.map((item) => {
              if (item === challengeId) {
                disabledSolution = false
                colorDisableSolution = "bg-yellow-1"
              } else {
              }
            })}
            color={colorDisableSolution}
            disabled={disabledSolution}
          >
            Solution
          </Button>
        )}
      </div>
      {!challengeNotion ? (
        <Spinner />
      ) : (
        // <NotionRenderer blockMap={challengeNotion} />
        <>
          <p>
            You are given the heads of two sorted linked lists
            <strong>list1</strong> and <strong>list2</strong>.
          </p>
          <br />

          <p>
            Merge the two lists in a one sorted list. The list should be made by
            splicing together the nodes of the first two lists.
          </p>
          <br />

          <p> Return the head of the merged linked list.</p>

          <br />

          <p className="pb-5">Example 1:</p>

          <img
            src="https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg"
            alt=""
          />

          <div className="flex-initial w-full p-5 bg-gray-3 rounded-md mt-5">
            Input: list1 = [1,2,4], list2 = [1,3,4]
            <br />
            Output: [1,1,2,3,4,4]
          </div>
          <br />
          <p>Example 2:</p>

          <div className="flex-initial w-full p-5 bg-gray-3 rounded-md mt-5">
            Input: list1 = [], list2 = []
            <br />
            Output: []
          </div>

          <br />
          <p>Example 3:</p>

          <div className="flex-initial w-full p-5 bg-gray-3 rounded-md mt-5">
            Input: list1 = [], list2 = [0]
            <br />
            Output: [0]
          </div>
          <br />
          <strong> Constraints:</strong>

          <ol>
            <li>
              * The number of nodes in both lists is in the range [0, 50].
            </li>
            <li>* Both list1 and list2 are sorted in non-decreasing order.</li>
          </ol>
        </>
      )}
    </div>
  )
}

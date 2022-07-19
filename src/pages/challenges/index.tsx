import { useContext } from "react"
import { NotionRenderer } from "react-notion"
import Button from "../../components/Button/Button"
import UserRank from "../../components/Challenge/UserRank"
import Layout from "../../components/Layout"
import { UserContext } from "../../context/userContext"

import { DocumentTextIcon, LockClosedIcon } from "@heroicons/react/outline"
import Image from "next/image"

export default function Page({ challengeNotion }: any) {
  const userContext = useContext(UserContext)

  return (
    <Layout>
      <div className="w-5/6 m-auto">
        <div className="flex maxlg:flex-col gap-5 max-w-screen-xl m-auto pt-5">
          <div className="flex-initial w-full p-5 bg-gray-1 rounded-md mt-5">
            <div className="flex gap-5 mb-5">
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
              >
                Submit
              </Button>
              <Button icon={<LockClosedIcon className="h-5 w-5" />}>
                Solution
              </Button>
            </div>
            <NotionRenderer blockMap={challengeNotion} />
          </div>

          <div className="flex-initial w-3/6 maxlg:w-full p-5 bg-gray-1 rounded-md mt-5">
            <h1 className="text-xl font-semibold mb-5">Ranking</h1>
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

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/page/2e22de6b770e4166be301490f6ffd420"
  ).then((res) => res.json())

  return {
    props: {
      challengeNotion: data,
    },
  }
}

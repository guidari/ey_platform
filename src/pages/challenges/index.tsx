import Image from "next/image"
import Link from "next/link"
import ListChallenge from "../../components/Challenge/ListChallenge"
import Layout from "../../components/Layout"

export default function Page() {
  return (
    <Layout>
      <div className="w-5/6 m-auto max-w-screen-xl">
        <div className="flex maxxl:flex-col gap-5  pt-5">
          <div className="flex-initial w-full p-5 1 rounded-md mt-5">
            <h1 className="text-xl font-semibold mb-5">Challenges</h1>
            <ListChallenge />
          </div>

          <div className="flex-initial w-3/6 maxxl:w-full p-5 rounded-md mt-5">
            <Link href="challenges/weekChallenge">
              <Image
                src="/images/week_challenge.png"
                width={380}
                height={170}
                className="rounded-md cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

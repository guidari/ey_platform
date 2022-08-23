import { DesktopComputerIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import GrayBox from "../GrayBox/grayBox"

export default function UserProgress() {
  const userContext = useContext(UserContext)

  if (!userContext) {
    return (
      <GrayBox title="My Progress" size="full">
        <Link href="/login">
          <span
            style={{
              color: "#FFE600",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sign in
          </span>
        </Link>{" "}
        to see your progress in our platform!
      </GrayBox>
    )
  }

  return (
    <GrayBox title="My Progress" size="full">
      <div className="grid grid-cols-4 maxxl:grid-cols-2 maxmd:grid-cols-1 gap-5 justify-between px-5 maxmd:px-0 py-2">
        <div className="flex gap-2">
          <div>
            <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              {userContext?.progress.coursesInProgress}
            </h1>
            <h2 className="text-lg maxmd:text-md font-semibold">
              Enrolled courses
            </h2>
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              {userContext?.progress.completedCourses}
            </h1>
            <h2 className="text-lg font-semibold">Completed courses</h2>
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              {userContext?.progress.hours}
            </h1>
            <h2 className="text-lg font-semibold">Hours Completed this year</h2>
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            <DesktopComputerIcon className="w-12 bg-gray-3 p-3 rounded-full text-yellow-1" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              {userContext?.progress.challenges}
            </h1>
            <h2 className="text-lg font-semibold">Completed Challenges</h2>
          </div>
        </div>
      </div>
    </GrayBox>
  )
}

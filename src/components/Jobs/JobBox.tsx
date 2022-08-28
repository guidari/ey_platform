import { LocationMarkerIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { IJobBox } from "../../interface/IJobBox"

export default function JobBox({ title, description, location }: IJobBox) {
  return (
    <Link href="jobs/jobDescription">
      <div className="mt-5 bg-gray-1 rounded-md w-[90%] maxmd:w-[100%] cursor-pointer">
        <div className="p-5">
          <h1 className="text-yellow-2 font-semibold mb-3">
            Senior Software Development Engineer
          </h1>
          <p>
            AWS recently announced it will be leading an open-source fork of
            Elasticsearch and Kibana, in order to ensure open source versions of
            both packages remain available and well supported.
          </p>
        </div>

        <hr />
        <p className="px-5 py-3 flex">
          <LocationMarkerIcon className="h-5 w-5 mr-2 text-yellow-1" />{" "}
          Vancouver, Canada
        </p>
      </div>
    </Link>
  )
}

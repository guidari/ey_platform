import { LocationMarkerIcon } from "@heroicons/react/outline"

import Button from "../../components/Button/Button"
import Layout from "../../components/Layout"

export default function JobDescription() {
  return (
    <Layout>
      {/* HEADER */}
      <div className="w-full bg-gray-1 py-5">
        <div className="w-5/6 m-auto max-w-screen-xl py-5 flex place-items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              Senior Software Development Engineer
            </h1>
            <p>ID do cargo: 42 | Ernst & Young</p>
          </div>

          <div>
            <Button color="bg-yellow-1">Apply now</Button>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="w-5/6 m-auto max-w-screen-xl py-5">
        <div className="grid grid-cols-5 maxmd:grid-cols-1 gap-10">
          <div className="col-span-4">
            <h1 className="text-lg font-semibold">Job description</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              deserunt sapiente iure impedit ipsum culpa fugit temporibus
              obcaecati labore nisi a voluptates, consectetur ad dignissimos
              iusto nostrum nemo? Enim, quaerat.
            </p>
          </div>

          <div>
            <div className="divide-y divide-yellow-1">
              <h2 className="text-lg font-semibold py-2">Job details</h2>

              <div className="py-2">
                <p className="flex gap-2 place-items-center">
                  <LocationMarkerIcon className="text-yellow-1 w-5 h-5" />
                  Vancouver
                </p>
                <p className="flex gap-2 place-items-center">
                  <div>
                    <img src="/images/laptop.png" alt="laptop" />
                  </div>
                  Remote option
                </p>
                <p className="flex gap-2 place-items-center">
                  <div>
                    <img src="/images/job.png" alt="job" />
                  </div>
                  Software Developer
                </p>
              </div>

              <div className="py-2">
                <h2 className="text-lg font-semibold py-2">Related Jobs</h2>

                <div className="mb-2">
                  <p className="text-yellow-2 mb-2">Back-end Developer</p>
                  <p>Location: USA, VA Herndon</p>
                  <p>Posted: May 25, 2022</p>
                </div>

                <div className="mb-2">
                  <p className="text-yellow-2 mb-2">Front-end Developer</p>
                  <p>Location: USA, VA Herndon</p>
                  <p>Posted: May 25, 2022</p>
                </div>

                <div className="mb-2">
                  <p className="text-yellow-2 mb-2">Full-stack Developer</p>
                  <p>Location: USA, VA Herndon</p>
                  <p>Posted: May 25, 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

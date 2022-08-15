import { useContext } from "react"
import { SearchBar } from "../../components/Courses/SearchBar"
import JobBox from "../../components/Jobs/JobBox"
import Layout from "../../components/Layout"
import { UserContext } from "../../context/userContext"

export default function Page() {
  const userContext = useContext(UserContext)

  return (
    <Layout>
      <div className="w-full bg-gray-1 py-5">
        <div className="w-5/6 m-auto max-w-screen-xl py-5">
          <h1 className="text-xl font-semibold">
            Browse through our opportunities
          </h1>
          <div className="grid grid-cols-3 maxxl:grid-cols-2 maxmd:grid-cols-1">
            <SearchBar title="Search by key word" />
            <SearchBar title="Filter by technology" />
            <SearchBar title="Filter by category" />
          </div>
        </div>
      </div>
      <div className="w-5/6 m-auto max-w-screen-xl">
        <div className="grid grid-cols-3 maxxl:grid-cols-2 maxmd:grid-cols-1">
          <JobBox
            title="Senior Software Development Engineer"
            description="AWS recently announced it will be leading an open-source fork of
            Elasticsearch and Kibana, in order to ensure open source versions of
            both packages remain available and well supported."
            location="Vancouver, Canada"
          />
          <JobBox
            title="Senior Software Development Engineer"
            description="AWS recently announced it will be leading an open-source fork of
            Elasticsearch and Kibana, in order to ensure open source versions of
            both packages remain available and well supported."
            location="Vancouver, Canada"
          />
          <JobBox
            title="Senior Software Development Engineer"
            description="AWS recently announced it will be leading an open-source fork of
          Elasticsearch and Kibana, in order to ensure open source versions of
          both packages remain available and well supported."
            location="Vancouver, Canada"
          />
          <JobBox
            title="Senior Software Development Engineer"
            description="AWS recently announced it will be leading an open-source fork of
        Elasticsearch and Kibana, in order to ensure open source versions of
        both packages remain available and well supported."
            location="Vancouver, Canada"
          />
        </div>
      </div>
    </Layout>
  )
}

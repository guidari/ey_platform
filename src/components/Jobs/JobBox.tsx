import { LocationMarkerIcon } from "@heroicons/react/outline"
import { Box, Button } from "@mui/material"
import Router from "next/router"
import { IJobBox } from "../../interface/IJobBox"

export default function JobBox({ id, title, description, location }: IJobBox) {
  const jobInfo = (id: string) => {
    console.log("id", id)

    localStorage.setItem("jobId", id)

    Router.push({
      pathname: "/jobs/jobDescription",
      query: {
        id,
      },
    })
  }

  return (
    <div className="mt-5 bg-gray-1 rounded-md w-[90%] maxmd:w-[100%] cursor-pointer">
      <div className="p-5">
        <h1 className="text-yellow-2 font-semibold mb-3">{title}</h1>
        <p>{description}</p>
      </div>

      <hr />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          placeItems: "center",
        }}
      >
        <p className="px-5 py-3 flex">
          <LocationMarkerIcon className="h-5 w-5 mr-2 text-yellow-1" />{" "}
          {location}
        </p>

        <Box
          sx={{
            marginRight: 2,
          }}
        >
          <Button
            onClick={() => jobInfo(id)}
            variant="contained"
            sx={{
              backgroundColor: "var(--yellow-1)",
              color: "black",
              fontWeight: "700",
              height: 30,
              "&:hover": {
                backgroundColor: "var(--yellow-1)",

                opacity: "80%",
              },
            }}
          >
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
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Button>
        </Box>
      </Box>
    </div>
  )
}

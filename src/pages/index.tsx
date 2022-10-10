import { useAuthState } from "react-firebase-hooks/auth"

import { useContext } from "react"

import { Grid, useMediaQuery } from "@mui/material"
import { getAuth } from "firebase/auth"
import Link from "next/link"
import Button from "../components/Button/Button"
import Layout from "../components/Layout"
import { UserContext } from "../context/userContext"

export default function Page() {
  const userContext = useContext(UserContext)
  const matches = useMediaQuery("(min-width:1280px)")

  const auth = getAuth()

  const [user, loading, error] = useAuthState(auth)

  return (
    <Layout>
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 6, md: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingX: 7,
            // gap: 2,
          }}
        >
          <Grid xs={6} sx={{ marginTop: 4 }}>
            <img
              src="/images/code_home.svg"
              alt="Looking to a code screen"
              width={100}
            />
            <h1 className="text-yellow-1 font-bold text-3xl mt-3">
              Improve your coding skills.
            </h1>
            <p className="text-lg my-5">
              Technical interviews usually have coding challenges to select a
              few candidates for an interview.
            </p>

            <Link href="/challenges">
              <Button>Try a free challenge</Button>
            </Link>
          </Grid>
          <Grid xs={6} sx={{ marginTop: 4 }}>
            <img
              src="/images/job_hunter.svg"
              alt="Looking to a code screen"
              width={100}
            />
            <h1 className="text-yellow-1 font-bold text-3xl mt-3">
              Build new projects to show off
            </h1>
            <p className="text-lg my-5">
              Find a course that best suits your needs and dive in to the coding
              improve your technical skills.
            </p>

            <Link href="/courses">
              <Button>Find a course</Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

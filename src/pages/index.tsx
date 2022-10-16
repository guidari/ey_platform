import { useAuthState } from "react-firebase-hooks/auth"

import { useContext } from "react"

import { Box, Grid, useMediaQuery } from "@mui/material"
import { getAuth } from "firebase/auth"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import Button from "../components/Button/Button"
import Layout from "../components/Layout"
import { UserContext } from "../context/userContext"

export default function Page() {
  const { t } = useTranslation()

  const userContext = useContext(UserContext)
  const matches = useMediaQuery("(min-width:1280px)")

  const auth = getAuth()

  const [user, loading, error] = useAuthState(auth)

  return (
    <Layout>
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <Grid
          container
          spacing={2}
          columns={{ xs: 6, md: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingX: 7,
            // gap: 2,
          }}
        >
          <Grid xs={6} sx={{ marginTop: 4 }}>
            <Box
              sx={{
                height: 80,
              }}
            >
              <img
                src="/images/code_home.svg"
                alt="Looking to a code screen"
                width={100}
              />
            </Box>
            <h1 className="text-yellow-1 font-bold text-3xl mt-3">
              {t("common:titleChallenge")}
            </h1>
            <p className="text-lg my-5">{t("common:descChallenge")}</p>

            <Link href="/challenges">
              <Button>{t("common:btnChallenge")}</Button>
            </Link>
          </Grid>

          <Grid xs={6} sx={{ marginTop: 4 }}>
            <Box
              sx={{
                height: 80,
              }}
            >
              <img
                src="/images/knowledge.svg"
                alt="Looking to a code screen"
                width={100}
              />
            </Box>

            <h1 className="text-yellow-1 font-bold text-3xl mt-3">
              {t("common:titleCourse")}
            </h1>
            <p className="text-lg my-5">{t("common:descCourse")}</p>

            <Link href="/courses">
              <Button>{t("common:btnCourses")}</Button>
            </Link>
          </Grid>

          <Grid xs={6} sx={{ marginTop: 4 }}>
            <Box
              sx={{
                height: 80,
              }}
            >
              <img
                src="/images/job_hunter.svg"
                alt="Looking to a code screen"
                width={100}
              />
            </Box>

            <h1 className="text-yellow-1 font-bold text-3xl mt-3">
              {t("common:titleJob")}
            </h1>
            <p className="text-lg my-5">{t("common:descJob")}</p>

            <Link href="/jobs">
              <Button> {t("common:btnJob")}</Button>
            </Link>
          </Grid>

          <Grid xs={6} sx={{ marginTop: 4 }}>
            <Box
              sx={{
                height: 80,
              }}
            >
              <img
                src="/images/profileData.svg"
                alt="Looking to a code screen"
                width={100}
              />
            </Box>

            <h1 className="text-yellow-1 font-bold text-3xl mt-3">
              {t("common:titleProfile")}
            </h1>
            <p className="text-lg my-5">{t("common:descProfile")}</p>

            <Link href="/profile">
              <Button
                disabled={user ? false : true}
                title={user ? "" : "Sign in to see your profile"}
                color={user ? "" : "bg-gray-1"}
              >
                {t("common:btnProfile")}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

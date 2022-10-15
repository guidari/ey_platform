import { Box } from "@mui/material"
import { useContext } from "react"
import Layout from "../../components/Layout"
import { UserContext } from "../../context/userContext"

export default function News() {
  const userContext = useContext(UserContext)

  return (
    <Layout>
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        <Box
          sx={{
            height: 300,
          }}
        >
          <img
            src="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2022/ey-overhead-aerial-panorama-of-kaprun-high-mountain-reservoir-austria-static-no-zoom.jpg.rendition.3840.2560.jpg"
            alt="background with water and ey logo"
          />
        </Box>
      </div>
    </Layout>
  )
}

import { Grid } from "@mui/material"
import { useContext } from "react"
import Layout from "../../components/Layout"
import NewsBox from "../../components/news/newsBox"
import { UserContext } from "../../context/userContext"

export default function News() {
  const userContext = useContext(UserContext)

  return (
    <Layout>
      <div className="flex flex-col gap-5 max-w-screen-xl maxxl:inline m-auto pt-5">
        {/* <Box
          sx={{
            height: 300,
          }}
        >
          <img
            src="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/global-review/2022/ey-overhead-aerial-panorama-of-kaprun-high-mountain-reservoir-austria-static-no-zoom.jpg.rendition.3840.2560.jpg"
            alt="background with water and ey logo"
          />
        </Box> */}

        <Grid container spacing={2} columns={{ xs: 6, sm: 8, md: 12 }}>
          <Grid item xs={4}>
            <NewsBox
              image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/news/2022/10/ey-woman-eye-rainbow.jpg.rendition.900.600.jpg"
              title="EY announces 52 women founders selected for the EY Entrepreneurial Winning Women™ EMEIA class of 2022"
              description="London, 6 October 2022. The EY organization today announces the details of the 52 women founders..."
              link="https://www.ey.com/en_gl/news/2022/10/ey-announces-52-women-founders-selected-for-the-ey-entrepreneurial-winning-women-emeia-class-of-2022"
            />
          </Grid>
          <Grid item xs={4}>
            <NewsBox
              image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/financial-services/ey-programmer-working-with-program-code.jpg.rendition.690.460.jpg"
              title="EY named a leader in IT-OT Industrial Consulting and Managed Services"
              description="Westlands Advisory has positioned EY as a top-ranked provider in IT-OT Security Consulting and Managed Services."
              link="https://www.ey.com/en_gl/news/2022/09/ey-named-a-leader-in-it-ot-industrial-consulting-and-managed-services"
            />
          </Grid>
          <Grid item xs={4}>
            <NewsBox
              image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/news/2020/03/ey-designer-laptop-office-desk.jpg.rendition.690.460.jpg"
              title="EY named a Leader by Gartner for SAP S/4 HANA Application Services"
              description="We are delighted to be positioned as a Leader by Gartner in Magic Quadrant for SAP S/4 HANA Application Services."
              link="https://www.ey.com/en_gl/news/2022/09/ey-named-a-leader-by-idc-for-sap-implementation-services-worldwide"
            />
          </Grid>
          <Grid item xs={4}>
            <NewsBox
              image="https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/news/2022/05/ey-mother-points-at-wind-turbines-while-holding-daughter.jpg.rendition.690.460.jpg"
              title="EY ranked #2 overall and #1 in execution for Sustainability Services"
              description="HFS Research has positioned EY as a top-ranked provider for Sustainability Services."
              link="https://www.ey.com/en_gl/news/2022/08/ey-ranked-2-overall-and-1-in-execution-for-sustainability-services"
            />
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

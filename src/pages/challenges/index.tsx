import { Backdrop, Box, Fade, Modal, useMediaQuery } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Challenge from "../../components/Challenge/Challenge"
import ListChallenge from "../../components/Challenge/ListChallenge"
import Layout from "../../components/Layout"

export default function Page() {
  const matches = useMediaQuery("(min-width:1280px)")

  const [open, setOpen] = useState(false)
  const [challenge, setChallenge] = useState()
  const handleClose = () => setOpen(false)

  const viewChallenge = (e: any) => {
    console.log("challengeInfo", e.row)
    setChallenge(e.row)
    setOpen(true)
  }

  return (
    <Layout>
      <div className="w-5/6 m-auto max-w-screen-xl">
        <div className="flex maxxl:flex-col gap-5  pt-5">
          <div className="flex-initial w-full p-5 1 rounded-md mt-5">
            <ListChallenge onRowClick={viewChallenge} />
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

      {/* Modal */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          position: "absolute",
          // top: "5%",
          overflow: "scroll",
          display: "block",
          height: "100%",
          zIndex: 99,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: !matches ? "90%" : "60%",
              bgcolor: "var(--gray-300)",
              boxShadow: "0 2px 3px rgb(0 0 0 / 15%)",
              borderRadius: 2,
              padding: 2,
              height: "fit-content",
              overflowY: "scroll",
              maxHeight: "80%",
              zIndex: 1,
            }}
          >
            <Challenge data={challenge} />
          </Box>
        </Fade>
      </Modal>
    </Layout>
  )
}

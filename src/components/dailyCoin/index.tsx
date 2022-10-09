import { useAuthState } from "react-firebase-hooks/auth"

import { useContext, useEffect, useState } from "react"

import { Backdrop, Box, Fade, Modal, useMediaQuery } from "@mui/material"
import { getAuth } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { UserContext } from "../../context/userContext"
import Button from "../Button/Button"

export default function DailyCoin() {
  const userContext = useContext(UserContext)

  const matches = useMediaQuery("(min-width:1280px)")

  const auth = getAuth()

  const [user, loading, error] = useAuthState(auth)

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const updateCoin = () => {
    console.log("user", user, "userContext", userContext)
    if (userContext) {
      const updatedEycoin = userContext!.eycoin + 1
      updateDoc(doc(db, `users/${userContext?.id}`), {
        eycoin: updatedEycoin,
      })
      setOpen(true)
      localStorage.setItem("dailyCoin", new Date(Date.now()).toString())
    }
  }

  useEffect(() => {
    const dailyCoin = localStorage.getItem("dailyCoin")?.split(" ")
    const dateNow = new Date(Date.now()).toString()?.split(" ")
    console.log("dailyCoin", dailyCoin, "dateNow", dateNow)
    if (dailyCoin === undefined) {
      return updateCoin()
    }
    if (dailyCoin![2] === dateNow[2]) {
      return console.log("Wait until tomorrow to win a coin")
    }

    updateCoin()
  }, [])

  return (
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
            width: !matches ? "80%" : "20%",
            bgcolor: "var(--gray-300)",
            boxShadow: "0 2px 3px rgb(0 0 0 / 15%)",
            borderRadius: 2,
            padding: 2,
            height: "fit-content",
            maxHeight: "80%",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              placeItems: "center",
            }}
          >
            <p style={{ fontSize: 16, fontWeight: "bold" }}>
              Log in every day to win a coin!
            </p>
            <span style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
              💰+1
            </span>
            <Button
              style={{ marginTop: 20 }}
              onClick={() => {
                setOpen(false)
              }}
            >
              Thank you!
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

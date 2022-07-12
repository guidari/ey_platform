import { ReactNode, useContext, useState } from "react"
import { UserContext } from "../../context/userContext"

interface IButton {
  children: ReactNode
  onClick?: () => void
  value?: number
  color?: string
}

export default function Button({ children, onClick, value, color }: IButton) {
  const user = useContext(UserContext)

  function setColorGray() {
    color = "gray"
  }
  function setColorYeloow() {
    color = "yellow"
  }

  return (
    <>
      {user?.enrolledCourses.forEach((course) => {
        if (course == value) {
          console.log("igual")
          setColorGray()
        } else {
          setColorYeloow()
        }
      })}
      <button
        value={value}
        onClick={onClick}
        className={`cursor-pointer bg-${color}-1 text-black px-3 py-2 rounded-md text-sm font-medium hover:opacity-80`}
      >
        {children}
      </button>
    </>
  )
}

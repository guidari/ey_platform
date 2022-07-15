import { ReactNode, useContext, useState } from "react"
import { UserContext } from "../../context/userContext"

interface IButton {
  children: ReactNode
  onClick?: () => void
  value?: number
  color?: string
  hidden?: ""
}

export default function Button({
  children,
  onClick,
  value,
  color,
  hidden,
}: IButton) {
  const userContext = useContext(UserContext)

  if (!color) {
    color = "bg-yellow-1"
  }

  return (
    <>
      <button
        value={value}
        onClick={onClick}
        className={`cursor-pointer ${color} text-black px-3 py-2 rounded-md text-sm font-medium ease-out duration-300 hover:opacity-80 ${hidden}`}
      >
        {children}
      </button>
    </>
  )
}

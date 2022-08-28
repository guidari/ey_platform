import {
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react"
import { UserContext } from "../../context/userContext"

type IButton = ButtonHTMLAttributes<any> & {
  children: ReactNode
  onClick?: () => void
  value?: number
  color?: string
  hidden?: ""
  icon?: ReactElement
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  value,
  color,
  hidden,
  icon,
  disabled,
  ...rest
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
        disabled={disabled}
        {...rest}
      >
        {/* {!icon && { children }} */}
        <div className="flex place-items-center gap-2">
          {icon}
          {children}
        </div>
      </button>
    </>
  )
}
